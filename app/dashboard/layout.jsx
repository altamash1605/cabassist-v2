"use client";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { getBrowserClient } from "@/lib/supabase-browser";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const supabase = useMemo(() => getBrowserClient(), []);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [hasNew, setHasNew] = useState(false);

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
      const seen = !!data.user.user_metadata?.has_seen_tour;
      setHasNew(!seen);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [supabase, router]);

  async function markTourSeen() {
    try {
      await supabase.auth.updateUser({ data: { has_seen_tour: true } });
    } catch (_) {}
    setHasNew(false);
  }

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
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 min-h-screen border-l border-neutral-900 bg-neutral-950/60">
        <Topbar
          email={email}
          onSignOut={signOut}
          hasNew={hasNew}
          onStartTour={() => {}}       // tour now handled in DashboardShell
          onDismissNew={markTourSeen}
        />
        <div className="px-6 sm:px-10 pb-12">{children}</div>
      </main>
    </div>
  );
}
