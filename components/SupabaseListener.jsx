"use client";

import { useEffect } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";

export default function SupabaseListener() {
  const supabase = getBrowserClient();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Tell the server to set/clear cookies
        await fetch("/auth/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event, session })
        });
      }
    );
    return () => subscription.unsubscribe();
  }, [supabase]);

  return null;
}
