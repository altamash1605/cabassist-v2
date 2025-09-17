"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Mail, User, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export default function Topbar({ email, onSignOut, hasNew = false, onStartTour, onDismissNew }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const router = useRouter();

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
        )
          setUserMenuOpen(false);
      }
      if (notifOpen) {
        if (
          notifRef.current &&
          !notifRef.current.contains(e.target) &&
          bellBtnRef.current &&
          !bellBtnRef.current.contains(e.target)
        )
          setNotifOpen(false);
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

  async function handleSignOut() {
    try {
      NProgress.start();
      await onSignOut?.(); // Supabase signOut()
      // 🔄 Trigger soft reload to clear client state
      router.refresh();
      // ⏳ Wait one tick so refresh applies before redirect
      setTimeout(() => {
        router.push("/auth");
        NProgress.done();
      }, 50);
    } catch (err) {
      NProgress.done();
      console.error("Sign out failed:", err);
    }
  }

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
          {/* ... unchanged code ... */}

          {/* Desktop: email + sign out */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-sm text-neutral-300">{email}</div>
            <button
              onClick={handleSignOut}
              className="rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700"
            >
              Sign out
            </button>
          </div>

          {/* Mobile dropdown */}
          {/* ... unchanged code ... */}
        </div>
      </div>
    </header>
  );
}
