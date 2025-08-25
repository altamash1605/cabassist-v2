"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase-browser";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CSVGenerator from "./CSVGenerator";

export default function DashboardShell() {
  const supabase = useMemo(() => getBrowserClient(), []);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;

      if (!data?.user) {
        router.replace("/auth");
        return;
      }
      setEmail(data.user.email ?? "");
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [supabase, router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/auth");
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-950 text-neutral-300">
        <div className="animate-pulse text-sm">Loading your workspace…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <main className="min-h-screen border-l border-neutral-900 bg-neutral-950/60">
          <Topbar email={email} onSignOut={signOut} />
          <div className="px-6 sm:px-10 pb-12">
            <CSVGenerator />
          </div>
        </main>
      </div>
    </div>
  );
}
