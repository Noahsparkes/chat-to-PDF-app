// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Safe fallback for build-time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Only create the client if we're in a browser or if we have the necessary values
const createSupabaseClient = () => {
  // Check if we're in a browser environment or have required values
  if (typeof window !== 'undefined' || (supabaseUrl && supabaseAnonKey)) {
    return createClient(supabaseUrl, supabaseAnonKey);
  }
  
  // During build process, return a mock client
  return {
    auth: { /* mock methods */ },
    from: () => ({ /* mock methods */ }),
    // Add other methods you use
  } as unknown as SupabaseClient;
};

export const supabase = createSupabaseClient();