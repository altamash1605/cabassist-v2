"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Mail, User, Sparkles } from "lucide-react";

export default function Topbar({ email, onSignOut, hasNew = false, onStartTour, onDismissNew }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const userBtnRef = useRef(null);
  const userMenuRef = useRef(null);
  const bellBtnRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click / Escape
  useEffect(() => {
    function onDocClick(e) {
      if (userMenuOpen) {
        if (
          userMenuRef.current &&
          !userMenuRef.current.contains(e.target) &&
          userBtnRef.current &&
          !userBtnRef.current.contains(e.target)
        ) setUserMenuOpen(false);
      }
      if (notifOpen) {
        if (
          notifRef.current &&
          !notifRef.current.contains(e.target) &&
          bellBtnRef.current &&
          !bellBtnRef.current.contains(e.target)
        ) setNotifOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen, notifOpen]);

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
          {/* Notifications */}
          <div className="relative">
            <button
              ref={bellBtnRef}
              onClick={() => {
                setNotifOpen(v => !v);
                setUserMenuOpen(false);
              }}
              className="relative rounded-xl border border-neutral-800 bg-neutral-950/60 p-2 hover:border-neutral-700"
              aria-label="Notifications"
              aria-haspopup="menu"
              aria-expanded={notifOpen}
            >
              <Bell className="h-4 w-4 text-neutral-300" />
              {hasNew && (
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-neutral-950" />
              )}
            </button>

            {notifOpen && (
              <div
                ref={notifRef}
                role="menu"
                className="absolute right-0 mt-2 w-80 rounded-xl border border-neutral-900 bg-neutral-900/95 backdrop-blur shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] z-30 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-neutral-800 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-300" />
                  <div className="text-sm font-medium text-neutral-200">Notifications</div>
                </div>

                {hasNew ? (
                  <div className="px-4 py-3 text-sm text-neutral-300">
                    <p className="leading-relaxed">
                      Welcome! Want a 1-minute tour of the app?
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          setNotifOpen(false);
                          onStartTour?.();
                        }}
                        className="rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-700 px-3 py-2 text-xs font-medium text-white hover:from-indigo-500 hover:to-indigo-600"
                      >
                        Start tour
                      </button>
                      <button
                        onClick={() => {
                          setNotifOpen(false);
                          onDismissNew?.();
                        }}
                        className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-xs hover:border-neutral-700"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-neutral-400">
                    You’re all caught up.
                  </div>
                )}
              </div>
            )}
          </div>

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

          {/* Mobile: user dropdown */}
          <div className="relative sm:hidden">
            <button
              ref={userBtnRef}
              onClick={() => {
                setUserMenuOpen(v => !v);
                setNotifOpen(false);
              }}
              className="inline-flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-950/60 px-2.5 py-2 hover:border-neutral-700"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              aria-controls="mobile-user-menu"
            >
              <User className="h-4 w-4 text-neutral-300" />
              <ChevronDown className="h-4 w-4 text-neutral-400" />
              <span className="sr-only">Open user menu</span>
            </button>

            {userMenuOpen && (
              <div
                id="mobile-user-menu"
                ref={userMenuRef}
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
                  onClick={onSignOut}
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
