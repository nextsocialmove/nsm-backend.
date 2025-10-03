
# NSM Backend (Vercel + Supabase)

This is a minimal serverless backend for Next Social Move. It exposes a single endpoint:

- `POST /api/register` → upserts a profile into the `profiles` table (email, full_name, city)

## 1) Deploy to Vercel (no GitHub needed)
1. Go to https://vercel.com/new (login).
2. Click **"Deploy manually"** → **"Import"** and drag this folder.
3. After deploy, go to **Project → Settings → Environment Variables** and add:
   - `SUPABASE_URL` = your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your **Service Role** key (server-only)
   - `ALLOWED_ORIGINS` = `https://www.nextsocialmove.com,https://nextsocialmove.com`

4. Redeploy. Your API will be available at a URL like:
   `https://YOUR-PROJECT.vercel.app/api/register`

## 2) Create the table in Supabase
Open Supabase → SQL Editor and run `schema.sql` from this repo.

## 3) Test
- Health check: GET `/api/health` → `{ ok: true }`
- Register: POST `/api/register` with JSON body:
```json
{ "email": "test@example.com", "full_name": "Test User", "city": "Houston" }
```

You should see a new row in `profiles` in Supabase.

## 4) Connect Squarespace
In your Squarespace Code Block script, set:
```js
const API_URL = "https://YOUR-PROJECT.vercel.app/api/register";
```

## Notes
- Do **not** expose the Service Role key in client-side code. It's only used on the serverless function here.
- CORS is restricted via `ALLOWED_ORIGINS`. Add staging origins if needed.
