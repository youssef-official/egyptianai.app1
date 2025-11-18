import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentRequest {
  amount: number;
  paymentMethod: 'wallet' | 'paypal' | 'card';
  userId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, paymentMethod, userId }: PaymentRequest = await req.json();
    
    const PAYMOB_API_KEY = Deno.env.get('PAYMOB_API_KEY');
    const PAYMOB_SECRET = Deno.env.get('PAYMOB_SECRET');
    
    if (!PAYMOB_API_KEY || !PAYMOB_SECRET) {
      throw new Error('Paymob credentials not configured');
    }

    // Get integration ID based on payment method
    const integrationIds: Record<string, string> = {
      wallet: '5310447',
      paypal: '5310393',
      card: '5234503'
    };

    const integrationId = integrationIds[paymentMethod];
    
    // Step 1: Get authentication token
    const authResponse = await fetch('https://accept.paymob.com/api/auth/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: PAYMOB_API_KEY })
    });

    const authData = await authResponse.json();
    const token = authData.token;

    // Step 2: Create order
    const orderResponse = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: false,
        amount_cents: amount * 100,
        currency: 'EGP',
        items: []
      })
    });

    const orderData = await orderResponse.json();

    // Step 3: Create payment key
    const paymentKeyResponse = await fetch('https://accept.paymob.com/api/acceptance/payment_keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: amount * 100,
        expiration: 3600,
        order_id: orderData.id,
        billing_data: {
          apartment: "NA",
          email: "user@example.com",
          floor: "NA",
          first_name: "User",
          street: "NA",
          building: "NA",
          phone_number: "01000000000",
          shipping_method: "NA",
          postal_code: "NA",
          city: "NA",
          country: "NA",
          last_name: "Name",
          state: "NA"
        },
        currency: "EGP",
        integration_id: integrationId
      })
    });

    const paymentKeyData = await paymentKeyResponse.json();

    // Return iframe URL
    const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/948897?payment_token=${paymentKeyData.token}`;

    return new Response(
      JSON.stringify({ 
        success: true, 
        iframeUrl,
        orderId: orderData.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error: any) {
    console.error('Paymob payment error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
};

serve(handler);