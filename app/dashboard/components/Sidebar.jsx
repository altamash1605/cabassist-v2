"use client";

import { Home, CalendarCog, UserCog } from "lucide-react";  // ⬅️ added UserCog
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/components/Brand";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col min-h-screen bg-neutral-950/60 border-r border-neutral-900 p-4">
      {/* Brand */}
      <div className="mb-6 flex items-center gap-3">
        <Brand />
        <div className="text-sm text-neutral-400">Workspace</div>
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        <NavItem
          icon={<Home className="h-4 w-4" />}
          label="Overview"
          href="/dashboard"
          active={pathname === "/dashboard"}
        />
        <NavItem
          icon={<CalendarCog className="h-4 w-4" />}
          label="Customise Shifts"
          href="/dashboard/shifts"
          active={pathname.startsWith("/dashboard/shifts")}
        />
      </nav>

      {/* Manage Account button */}
      <div className="mt-auto space-y-1">
        <NavItem
          icon={<UserCog className="h-4 w-4" />}
          label="Manage Account"
          href="/dashboard/account"   // ⬅️ new page
          active={pathname.startsWith("/dashboard/account")}
        />

        {/* Footer badge */}
        <div className="pt-6 text-xs text-neutral-500">
          v1.0 • Secure. Fast. Minimal.
        </div>
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
