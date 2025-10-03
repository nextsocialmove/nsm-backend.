
# NSM Backend (Vercel + Supabase)

Endpoints:
- `GET /api/health` → `{ ok: true }`
- `POST /api/register` → insert/upsert profile (email, full_name, city)

## Deploy
1. Upload this folder to GitHub.
2. Import repo into Vercel → Deploy.
3. Add env vars in Settings:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ALLOWED_ORIGINS`
4. Redeploy.

## Supabase Schema
Run `schema.sql` in your Supabase project to create the `profiles` table.
