import { createClient } from '@supabase/supabase-js';

// ⚠️ These two values are SAFE to commit — they're gated by RLS.
// Get them from: Supabase → Project Settings → API
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Signal = {
  id: string;
  asset: string;
  action: 'BUY' | 'SELL';
  confidence: number;
  price: number;
  atr: number;
  adx: number;
  reasons: string[];
  created_at: string;
};
