// lib/supabase-browser.js
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export function getBrowserClient() {
  return createClientComponentClient(); // reads env vars automatically
}
