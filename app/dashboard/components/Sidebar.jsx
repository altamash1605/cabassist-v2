"use client";

import { Home, FolderOpen, Users, Settings } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col min-h-screen bg-neutral-950/60 border-r border-neutral-900 p-4">
      {/* Brand */}
      <div className="mb-6 flex items-center gap-3">
        <div className="h-9 w-9 grid place-items-center rounded-lg bg-neutral-900 ring-1 ring-neutral-800 text-neutral-200 tracking-tight">
          <span className="text-sm font-semibold">AX</span>
        </div>
        <div className="text-sm text-neutral-400">Workspace</div>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        <NavItem icon={<Home className="h-4 w-4" />} label="Overview" href="/dashboard" active />
        <NavItem icon={<FolderOpen className="h-4 w-4" />} label="Projects" href="#" />
        <NavItem icon={<Users className="h-4 w-4" />} label="Team" href="#" />
        <NavItem icon={<Settings className="h-4 w-4" />} label="Settings" href="#" />
      </nav>

      {/* Footer badge */}
      <div className="mt-auto pt-6 text-xs text-neutral-500">
        v1.0 • Secure. Fast. Minimal.
      </div>
    </aside>
  );
}

function NavItem({ icon, label, href, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition
        ${active
          ? "bg-neutral-900/60 border-neutral-800 text-neutral-100"
          : "bg-neutral-950/40 border-neutral-900 text-neutral-300 hover:border-neutral-800 hover:text-neutral-100"}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
