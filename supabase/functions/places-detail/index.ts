import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GOOGLE_MAPS_API_KEY = Deno.env.get('GOOGLE_MAPS_API_KEY');
    if (!GOOGLE_MAPS_API_KEY) {
      throw new Error('GOOGLE_MAPS_API_KEY is not configured');
    }

    const { placeId, sessionToken } = await req.json();

    if (!placeId || typeof placeId !== 'string') {
      return new Response(JSON.stringify({ error: 'placeId is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const params = new URLSearchParams({
      place_id: placeId,
      fields: 'address_components,formatted_address',
      key: GOOGLE_MAPS_API_KEY,
    });

    if (sessionToken) {
      params.set('sessiontoken', sessionToken);
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Google Places Detail API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    const result = data.result;
    if (!result) {
      return new Response(JSON.stringify({ error: 'No result found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse address components
    const components = result.address_components || [];
    const get = (type: string) =>
      components.find((c: any) => c.types.includes(type))?.long_name || '';

    const streetNumber = get('street_number');
    const route = get('route');
    const address = streetNumber ? `${streetNumber} ${route}` : route;
    const city = get('locality') || get('sublocality') || get('administrative_area_level_3');
    const postalCode = get('postal_code');

    return new Response(
      JSON.stringify({ address, city, postalCode, formattedAddress: result.formatted_address }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Places detail error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
