"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Mail, User } from "lucide-react";

export default function Topbar({ email, onSignOut }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-900 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/50">
      <div className="h-16 px-6 sm:px-10 flex items-center justify-between">
        {/* Left badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/40 px-3 py-1 text-xs text-neutral-300">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
          You’re logged in
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Notifications (always visible) */}
          <button
            className="rounded-xl border border-neutral-800 bg-neutral-950/60 p-2 hover:border-neutral-700"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4 text-neutral-300" />
          </button>

          {/* Desktop: email + sign out */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-sm text-neutral-300">{email}</div>
            <button
              onClick={onSignOut}
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700"
            >
              Sign out
            </button>
          </div>

          {/* Mobile: avatar/menu button + dropdown */}
          <div className="relative sm:hidden">
            <button
              ref={btnRef}
              onClick={() => setOpen(o => !o)}
              className="inline-flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-950/60 px-2.5 py-2 hover:border-neutral-700"
              aria-haspopup="menu"
              aria-expanded={open}
              aria-controls="mobile-user-menu"
            >
              <User className="h-4 w-4 text-neutral-300" />
              <ChevronDown className="h-4 w-4 text-neutral-400" />
              <span className="sr-only">Open user menu</span>
            </button>

            {open && (
              <div
                id="mobile-user-menu"
                ref={menuRef}
                role="menu"
                className="absolute right-0 mt-2 w-60 rounded-xl border border-neutral-900 bg-neutral-900/95 backdrop-blur shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] z-30 overflow-hidden"
              >
                <div className="px-3 py-2 border-b border-neutral-800">
                  <div className="text-[11px] uppercase tracking-wide text-neutral-500">Signed in as</div>
                  <div className="mt-1 inline-flex items-center gap-2 text-sm text-neutral-200 break-all">
                    <Mail className="h-4 w-4 text-neutral-400" />
                    {email}
                  </div>
                </div>

                <button
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onSignOut();
                  }}
                  className="w-full inline-flex items-center gap-2 px-4 py-3 text-sm text-neutral-200 hover:bg-neutral-800/60"
                >
                  <LogOut className="h-4 w-4 text-neutral-300" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
