'use server';

import { createClient } from '@supabase/supabase-js';

type Occasion = { person: string; occasion: string; date: string };

type ProfileData = {
  name: string;
  email: string;
  homeStyle: string;
  colourPref: string;
  occasions: Occasion[];
  deliveryFreq: string;
};

function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  );
}

export async function saveCustomerProfile(data: ProfileData) {
  const supabase = createAdminClient();
  const { error } = await supabase.from('customer_profiles').insert({
    name: data.name,
    email: data.email,
    home_style: data.homeStyle,
    colour_preference: data.colourPref,
    occasions: data.occasions,
    delivery_frequency: data.deliveryFreq,
  });
  if (error) throw new Error(error.message);
}
