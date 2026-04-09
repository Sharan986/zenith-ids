import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';
import { createServiceClient } from '@/utils/supabase/service';

const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY;
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const PHONEPE_API_URL = process.env.PHONEPE_API_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox';

export async function GET(request, { params }) {
  try {
    if (!PHONEPE_MERCHANT_ID || !PHONEPE_SALT_KEY) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured.' },
        { status: 500 }
      );
    }

    const { transactionId } = await params;
    if (!transactionId) {
      return NextResponse.json({ error: 'Missing transaction ID.' }, { status: 400 });
    }

    // Authenticate the user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    // Verify this transaction belongs to the current user
    const { data: payment, error: dbError } = await supabase
      .from('payments')
      .select('user_id, status, phonepe_transaction_id')
      .eq('merchant_transaction_id', transactionId)
      .single();

    if (dbError || !payment) {
      return NextResponse.json({ error: 'Transaction not found.' }, { status: 404 });
    }

    if (payment.user_id !== user.id) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 403 });
    }

    // If we already have a final status from the callback, return it directly
    if (payment.status === 'SUCCESS' || payment.status === 'FAILED') {
      return NextResponse.json({ status: payment.status });
    }

    // Otherwise, poll PhonePe for the current status
    const apiPath = `/pg/v1/status/${PHONEPE_MERCHANT_ID}/${transactionId}`;
    const checksumString = `${apiPath}${PHONEPE_SALT_KEY}`;
    const checksum = `${crypto.createHash('sha256').update(checksumString).digest('hex')}###${PHONEPE_SALT_INDEX}`;

    const phonePeResponse = await fetch(`${PHONEPE_API_URL}${apiPath}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': PHONEPE_MERCHANT_ID,
        accept: 'application/json',
      },
    });

    const phonePeData = await phonePeResponse.json();
    const isSuccess = phonePeData.code === 'PAYMENT_SUCCESS';
    const paymentStatus = isSuccess ? 'SUCCESS' : phonePeData.code === 'PAYMENT_PENDING' ? 'PENDING' : 'FAILED';

    // Sync status to our DB if it has changed from PENDING
    if (paymentStatus !== 'PENDING') {
      const serviceClient = createServiceClient();
      await serviceClient
        .from('payments')
        .update({
          status: paymentStatus,
          phonepe_transaction_id: phonePeData.data?.transactionId || null,
          response_payload: phonePeData,
        })
        .eq('merchant_transaction_id', transactionId);

      // Upgrade user to Pro on success
      if (isSuccess) {
        await serviceClient
          .from('users')
          .update({ subscription_tier: 'pro' })
          .eq('id', payment.user_id);
      }
    }

    return NextResponse.json({ status: paymentStatus });
  } catch (error) {
    console.error('PhonePe status check unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected server error.' }, { status: 500 });
  }
}
