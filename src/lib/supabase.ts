// src/lib/supabase.ts
import dotenv from "dotenv";
dotenv.config(); // make sure env vars are loaded first
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Supabase URL (supabase.ts):", supabaseUrl);
console.log("Supabase Key (supabase.ts):", supabaseKey?.slice(0,5) + "...");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key not set in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);