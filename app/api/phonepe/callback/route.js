import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createServiceClient } from '@/utils/supabase/service';

const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY;
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';

/**
 * PhonePe calls this endpoint server-to-server after a transaction.
 * The request body is base64-encoded and comes with an X-VERIFY header.
 */
export async function POST(request) {
  try {
    if (!PHONEPE_SALT_KEY) {
      console.error('PhonePe callback: PHONEPE_SALT_KEY is not set.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const body = await request.text();

    // PhonePe sends the callback as application/x-www-form-urlencoded with a "response" field
    const params = new URLSearchParams(body);
    const encodedResponse = params.get('response');

    if (!encodedResponse) {
      console.error('PhonePe callback: missing "response" field.');
      return NextResponse.json({ error: 'Invalid callback payload.' }, { status: 400 });
    }

    // Verify the X-VERIFY checksum from PhonePe
    const xVerifyHeader = request.headers.get('X-VERIFY') || '';
    const expectedChecksum = `${crypto
      .createHash('sha256')
      .update(`${encodedResponse}${PHONEPE_SALT_KEY}`)
      .digest('hex')}###${PHONEPE_SALT_INDEX}`;

    if (xVerifyHeader !== expectedChecksum) {
      console.error('PhonePe callback: checksum mismatch.', {
        received: xVerifyHeader,
        expected: expectedChecksum,
      });
      return NextResponse.json({ error: 'Checksum verification failed.' }, { status: 400 });
    }

    // Decode and parse the response payload
    const decoded = Buffer.from(encodedResponse, 'base64').toString('utf-8');
    const payload = JSON.parse(decoded);

    const { code, data } = payload;
    const merchantTransactionId = data?.merchantTransactionId;
    const phonePeTransactionId = data?.transactionId;

    if (!merchantTransactionId) {
      console.error('PhonePe callback: missing merchantTransactionId.', payload);
      return NextResponse.json({ error: 'Invalid callback data.' }, { status: 400 });
    }

    const supabase = createServiceClient();

    // Determine final status
    const isSuccess = code === 'PAYMENT_SUCCESS';
    const paymentStatus = isSuccess ? 'SUCCESS' : 'FAILED';

    // Update the payment record
    const { data: payment, error: updateError } = await supabase
      .from('payments')
      .update({
        status: paymentStatus,
        phonepe_transaction_id: phonePeTransactionId || null,
        response_payload: payload,
      })
      .eq('merchant_transaction_id', merchantTransactionId)
      .select('user_id')
      .single();

    if (updateError) {
      console.error('PhonePe callback: failed to update payment record:', updateError);
      return NextResponse.json({ error: 'Database update failed.' }, { status: 500 });
    }

    // If payment succeeded, upgrade the user to Pro
    if (isSuccess && payment?.user_id) {
      const { error: upgradeError } = await supabase
        .from('users')
        .update({ subscription_tier: 'pro' })
        .eq('id', payment.user_id);

      if (upgradeError) {
        console.error('PhonePe callback: failed to upgrade user:', upgradeError);
        // Don't return an error — the payment record is already marked SUCCESS.
        // A reconciliation job or manual review can handle the upgrade failure.
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PhonePe callback unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
