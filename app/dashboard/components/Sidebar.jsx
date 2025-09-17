"use client";

import { Home, CalendarCog, UserCog, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/components/Brand";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-3 fixed top-3 left-3 z-50 rounded-md border border-neutral-800"
      >
        <Menu className="h-5 w-5 text-neutral-200" />
      </button>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-neutral-950 border-r border-neutral-900 p-4 flex flex-col">
            {/* Brand */}
            <div className="md:mb-6 md:flex hidden md:items-center md:gap-3 gap-3 m-1">
              <Brand />
              <div className="text-sm text-neutral-400">Workspace</div>
            </div>

            {/* Nav */}
            <nav className="md:space-y-1 mt-16 space-y-2">
              <NavItem
                icon={<Home className="h-4 w-4" />}
                label="Overview"
                href="/dashboard"
                active={pathname === "/dashboard"}
                onClick={() => setOpen(false)}
              />
              <NavItem
                icon={<CalendarCog className="h-4 w-4" />}
                label="Customise Shifts"
                href="/dashboard/shifts"
                active={pathname.startsWith("/dashboard/shifts")}
                onClick={() => setOpen(false)}
              />
            </nav>

            {/* Manage Account */}
            <div className="mt-auto space-y-1">
              <NavItem
                icon={<UserCog className="h-4 w-4" />}
                label="Manage Account"
                href="/dashboard/account"
                active={pathname.startsWith("/dashboard/account")}
                onClick={() => setOpen(false)}
              />
              <div className="pt-6 text-xs text-neutral-500">
                v1.0 • Secure. Fast. Minimal.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
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

        {/* Manage Account */}
        <div className="mt-auto space-y-1">
          <NavItem
            icon={<UserCog className="h-4 w-4" />}
            label="Manage Account"
            href="/dashboard/account"
            active={pathname.startsWith("/dashboard/account")}
          />
          <div className="pt-6 text-xs text-neutral-500">
            v1.0 • Secure. Fast. Minimal.
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, href, active, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition
        ${
          active
            ? "bg-neutral-900/60 border-neutral-800 text-neutral-100"
            : "bg-neutral-950/40 border-neutral-900 text-neutral-300 hover:border-neutral-800 hover:text-neutral-100"
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
