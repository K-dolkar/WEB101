import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY) {
  console.warn('Missing Supabase credentials. Check your environment variables. Using placeholder values.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;