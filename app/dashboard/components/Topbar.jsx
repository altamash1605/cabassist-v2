"use client";

import { Bell } from "lucide-react";

export default function Topbar({ email, onSignOut }) {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-900 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
      <div className="h-16 px-6 sm:px-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/40 px-3 py-1 text-xs text-neutral-300">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
          You’re logged in
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-2 hover:border-neutral-700">
            <Bell className="h-4 w-4 text-neutral-300" />
          </button>
          <div className="text-sm text-neutral-300">{email}</div>
          <button onClick={onSignOut} className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700">
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
