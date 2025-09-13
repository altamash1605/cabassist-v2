"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
// import GoogleButton from "./GoogleButton";   // ⬅️ disabled for now
import { Sparkles, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Brand from "@/components/Brand";

export default function AuthCard() {
  const supabase = useMemo(() => getBrowserClient(), []);
  const router = useRouter();
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleEmailPassword() {
    if (!email || !password) {
      toast.info("Enter email and password");
      return;
    }
    setBusy(true);
    const t = toast.loading(
      mode === "login" ? "Logging in..." : "Creating your account..."
    );
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Logged in. Redirecting...", { id: t });
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
          // 🔑 Handle "already signed up" case
          if (error.code === "user_already_exists") {
            toast.error("This email is already registered. Please log in instead.", {
              id: t,
            });
            return;
          }
          throw error;
        }
        // If email confirmations are enabled, user must confirm first
        toast.success("Sign up successful. Check your email to confirm.", { id: t });
      }
    } catch (err) {
      toast.error(err?.message || "Something went wrong.", { id: t });
    } finally {
      setBusy(false);
    }
  }

  // async function handleGoogle() {
  //   setBusy(true);
  //   setMessage(null);
  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
  //     if (error) throw error;
  //     // Redirect happens automatically via Supabase OAuth
  //   } catch (err) {
  //     setMessage({ type: "error", text: err.message || "Google sign-in failed." });
  //   } finally {
  //     setBusy(false);
  //   }
  // }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Auth Card */}
      <div className="flex items-center justify-center p-6 sm:p-10 relative">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
          aria-hidden="true"
        >
          <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-indigo-600/20" />
          <div className="absolute -bottom-16 -right-8 h-72 w-72 rounded-full bg-fuchsia-600/20" />
        </div>

        <div className="relative w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 flex items-center gap-3">
            <Brand />
            <div>
              <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold">
                Welcome
              </h1>
              <p className="text-sm text-neutral-400">
                Log in or create your account
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_10px_30px_-10px_rgba(0,0,0,0.7)]">
            {/* Tabs / Toggle */}
            <div className="p-4 sm:p-6 border-b border-neutral-800/80">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-neutral-400">Authenticate</p>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() =>
                      setMode((m) => (m === "login" ? "signup" : "login"))
                    }
                    className="group inline-flex relative w-52 select-none cursor-pointer items-center justify-between rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-1 text-sm text-neutral-400 transition-colors hover:text-neutral-200"
                  >
                    <span
                      className={`absolute inset-y-0 left-0 w-1/2 rounded-lg bg-neutral-800 transition-transform ${
                        mode === "signup" ? "translate-x-full" : ""
                      }`}
                    />
                    <span
                      className={`z-10 flex-1 text-center ${
                        mode === "login" ? "text-white" : ""
                      }`}
                    >
                      Login
                    </span>
                    <span
                      className={`z-10 flex-1 text-center ${
                        mode === "signup" ? "text-white" : ""
                      }`}
                    >
                      Sign Up
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-4 sm:p-6 space-y-4">
              <EmailInput value={email} onChange={setEmail} disabled={busy} />
              <PasswordInput
                value={password}
                onChange={setPassword}
                disabled={busy}
              />
              <button
                type="button"
                disabled={busy}
                onClick={handleEmailPassword}
                className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium hover:bg-indigo-500 disabled:opacity-50 transition"
              >
                {mode === "login" ? "Log In" : "Sign Up"}
              </button>
            </div>

            {/* Help */}
            <div className="p-4 sm:p-6 border-t border-neutral-800/80 text-xs text-neutral-500">
              <p className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Having issues? Contact support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="hidden lg:flex items-center justify-center bg-neutral-950">
        <Image
          src="/auth-illustration.png"
          alt="Illustration"
          width={600}
          height={600}
          className="max-w-md"
        />
      </div>
    </div>
  );
}
