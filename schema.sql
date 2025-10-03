
-- Enable extension (if allowed)
create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  city text,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
-- Policy note: service role bypasses RLS; this permissive policy is fine for admin tools,
-- but you may tighten later for anon-key usage.
create policy "service can do all (placeholder)" on profiles
  for all using (true) with check (true);
