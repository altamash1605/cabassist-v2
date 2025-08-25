"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase-browser";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { BarChart3, CheckCircle2, Clock3, FileText, LogOut } from "lucide-react";

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
            {/* Headline */}
            <div className="mt-6">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Welcome back</h1>
              <p className="mt-1 text-sm text-neutral-400">Here’s a quick look at your app.</p>
            </div>

            {/* KPI cards */}
            <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              <Card title="Active Projects" value="7" icon={<FileText className="h-4 w-4" />} />
              <Card title="Tasks Completed" value="128" icon={<CheckCircle2 className="h-4 w-4" />} />
              <Card title="Hours Tracked" value="42.5" icon={<Clock3 className="h-4 w-4" />} />
              <Card title="This Week" value="+18%" icon={<BarChart3 className="h-4 w-4" />} />
            </div>

            {/* Content row */}
            <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 rounded-2xl border border-neutral-900 bg-neutral-900/40 backdrop-blur p-5">
                <h3 className="font-medium">Recent Activity</h3>
                <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                  <li className="rounded-xl border border-neutral-900/80 bg-neutral-900/40 p-3">You completed “Wire up Supabase Auth”.</li>
                  <li className="rounded-xl border border-neutral-900/80 bg-neutral-900/40 p-3">Invited <span className="text-neutral-100">teammate@example.com</span>.</li>
                  <li className="rounded-xl border border-neutral-900/80 bg-neutral-900/40 p-3">Created project “Mirbagh”.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 backdrop-blur p-5">
                <h3 className="font-medium">Quick Actions</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-700 px-3 py-2 text-sm font-medium shadow-[0_6px_16px_-6px_rgba(99,102,241,0.6)] hover:from-indigo-500 hover:to-indigo-600">New Project</button>
                  <button className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700">Invite</button>
                  <button className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700">Upload</button>
                  <button onClick={signOut} className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 backdrop-blur p-4">
      <div className="flex items-center justify-between">
        <div className="text-neutral-400 text-sm">{title}</div>
        <div className="text-neutral-400">{icon}</div>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
