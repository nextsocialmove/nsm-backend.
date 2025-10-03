
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var");
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

function setCors(req: VercelRequest, res: VercelResponse) {
  const origin = (req.headers.origin as string) || "";
  if (allowed.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(req, res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, full_name, city } = (req.body || {}) as {
      email?: string; full_name?: string; city?: string;
    };

    if (!email) return res.status(400).json({ error: "email required" });

    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        { email, full_name: full_name || null, city: city || null },
        { onConflict: "email" }
      )
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true, profile: data });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "server error" });
  }
}
