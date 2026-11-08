# Shadow Signals — Supabase Frontend

Private 90%-confluence signal dashboard for Quotex 5m plays.

## Stack
- React + Vite + TypeScript
- Supabase Auth + Postgres + Realtime
- Tailwind CSS
- Deployed on GitHub Pages

## Setup (5 steps)
1. Create Supabase project → https://supabase.com
2. Run `supabase/schema.sql` in SQL Editor (creates signals table + RLS)
3. Deploy `supabase/functions/scan_markets` Edge Function (see `supabase/README.md`)
4. Fill `src/lib/supabase.ts` with your Supabase URL + anon key
5. Push to GitHub → enable GitHub Pages (Settings → Pages → source: GitHub Actions)

## Local dev
```bash
npm install
npm run dev
