import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';
import { createServiceClient } from '@/utils/supabase/service';
import { PRO_PLAN_AMOUNT_PAISE } from '@/lib/plans';

const PHONEPE_MERCHANT_ID = process.env.PHONEPE_MERCHANT_ID;
const PHONEPE_SALT_KEY = process.env.PHONEPE_SALT_KEY;
const PHONEPE_SALT_INDEX = process.env.PHONEPE_SALT_INDEX || '1';
const PHONEPE_API_URL = process.env.PHONEPE_API_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST() {
  try {
    // Verify PhonePe credentials are configured
    if (!PHONEPE_MERCHANT_ID || !PHONEPE_SALT_KEY) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured.' },
        { status: 500 }
      );
    }

    // Authenticate the user
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'You must be logged in to upgrade.' },
        { status: 401 }
      );
    }

    // Check if user is already on Pro
    const { data: profile } = await supabase
      .from('users')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    if (profile?.subscription_tier === 'pro') {
      return NextResponse.json(
        { error: 'You are already on the Pro plan.' },
        { status: 400 }
      );
    }

    // Generate a unique merchant transaction ID using crypto.randomUUID()
    const merchantTransactionId = `MT-${crypto.randomUUID()}`;

    // Use service role client to insert the payment record (bypasses RLS)
    const serviceClient = createServiceClient();
    const { error: insertError } = await serviceClient.from('payments').insert({
      user_id: user.id,
      merchant_transaction_id: merchantTransactionId,
      amount: PRO_PLAN_AMOUNT_PAISE,
      status: 'PENDING',
      plan: 'pro',
    });

    if (insertError) {
      console.error('Failed to create payment record:', insertError);
      return NextResponse.json(
        { error: 'Failed to initiate payment. Please try again.' },
        { status: 500 }
      );
    }

    // Build the PhonePe payment payload
    const paymentPayload = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId,
      merchantUserId: `USER-${user.id.slice(0, 8)}`,
      amount: PRO_PLAN_AMOUNT_PAISE,
      redirectUrl: `${APP_URL}/pro/success?txnId=${merchantTransactionId}`,
      redirectMode: 'REDIRECT',
      callbackUrl: `${APP_URL}/api/phonepe/callback`,
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    // Encode payload to base64
    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');

    // Generate checksum: SHA256(base64payload + "/pg/v1/pay" + saltKey) + "###" + saltIndex
    const checksumString = `${base64Payload}/pg/v1/pay${PHONEPE_SALT_KEY}`;
    const checksum = `${crypto.createHash('sha256').update(checksumString).digest('hex')}###${PHONEPE_SALT_INDEX}`;

    // Call PhonePe API
    const phonePeResponse = await fetch(`${PHONEPE_API_URL}/pg/v1/pay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        accept: 'application/json',
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const phonePeData = await phonePeResponse.json();

    if (!phonePeData.success) {
      console.error('PhonePe initiate error:', phonePeData);
      return NextResponse.json(
        { error: phonePeData.message || 'Payment initiation failed. Please try again.' },
        { status: 502 }
      );
    }

    const redirectUrl = phonePeData.data?.instrumentResponse?.redirectInfo?.url;
    if (!redirectUrl) {
      console.error('No redirect URL in PhonePe response:', phonePeData);
      return NextResponse.json(
        { error: 'Invalid response from payment gateway.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ redirectUrl, merchantTransactionId });
  } catch (error) {
    console.error('PhonePe initiate unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
