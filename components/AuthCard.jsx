"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getBrowserClient } from "@/lib/supabase-browser";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import GoogleButton from "./GoogleButton";
import { Sparkles, HelpCircle } from "lucide-react";

export default function AuthCard() {
  const supabase = useMemo(() => getBrowserClient(), []);
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setMessage(null);
  }, [mode]);

  async function handleEmailPassword() {
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage({ type: "success", text: "Logged in. Redirecting..." });
        // TODO: router.push("/dashboard")
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage({ type: "success", text: "Sign up successful. Check your inbox for confirmation." });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Something went wrong." });
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
      if (error) throw error;
      // Redirect happens automatically via Supabase OAuth
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Google sign-in failed." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Auth Card */}
      <div className="flex items-center justify-center p-6 sm:p-10 relative">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 opacity-40 blur-3xl" aria-hidden="true">
          <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-indigo-600/20" />
          <div className="absolute -bottom-16 -right-8 h-72 w-72 rounded-full bg-fuchsia-600/20" />
        </div>

        <div className="relative w-full max-w-md">
          {/* Brand */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-9 w-9 grid place-items-center rounded-lg bg-neutral-900 ring-1 ring-neutral-800 text-neutral-200 tracking-tight">
              <span className="text-sm font-semibold">AX</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl tracking-tight font-semibold">Welcome</h1>
              <p className="text-sm text-neutral-400">Log in or create your account</p>
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
                    onClick={() => setMode(m => (m === "login" ? "signup" : "login"))}
                    className="group inline-flex relative w-52 select-none cursor-pointer items-center justify-between rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-1 text-sm text-neutral-400 transition-colors hover:border-neutral-700/80"
                    aria-label="Toggle login or sign up"
                  >
                    <span className={`relative z-10 w-1/2 py-2 text-center transition-colors group-hover:text-neutral-300 ${mode === "signup" ? "text-neutral-400" : "text-neutral-100"}`}>Log in</span>
                    <span className={`relative z-10 w-1/2 py-2 text-center transition-colors group-hover:text-neutral-300 ${mode === "signup" ? "text-neutral-100" : "text-neutral-400"}`}>Sign up</span>
                    <span
                      className={`pointer-events-none absolute inset-y-1 left-1 inline-block w-[calc(50%-4px)] rounded-lg bg-neutral-800/80 shadow-inner transition-transform duration-300 ease-out ${mode === "signup" ? "translate-x-full" : ""}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="p-4 sm:p-6">
              {mode === "login" ? (
                <div className="space-y-5" aria-labelledby="login-heading">
                  <h2 id="login-heading" className="text-lg font-semibold tracking-tight">Log in to your account</h2>
                  <div className="space-y-4">
                    <EmailInput id="login-email" value={email} onChange={setEmail} />
                    <PasswordInput id="login-password" value={password} onChange={setPassword} />
                    <button
                      onClick={handleEmailPassword}
                      disabled={busy}
                      className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(99,102,241,0.6)] transition hover:from-indigo-500 hover:to-indigo-600 hover:shadow-[0_10px_22px_-10px_rgba(99,102,241,0.8)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 active:scale-[0.99]"
                    >
                      <span>{busy ? "Please wait..." : "Log in"}</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-neutral-900/60 px-2 text-xs text-neutral-500">or continue with</span>
                    </div>
                  </div>

                  <GoogleButton onClick={handleGoogle} label="Sign in with Google" accent="indigo" />
                </div>
              ) : (
                <div className="space-y-5" aria-labelledby="signup-heading">
                  <h2 id="signup-heading" className="text-lg font-semibold tracking-tight">Create your account</h2>
                  <div className="space-y-4">
                    <EmailInput id="signup-email" value={email} onChange={setEmail} />
                    <PasswordInput id="signup-password" value={password} onChange={setPassword} placeholder="Minimum 8 characters" />
                    <button
                      onClick={handleEmailPassword}
                      disabled={busy}
                      className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-fuchsia-600 to-fuchsia-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(217,70,239,0.5)] transition hover:from-fuchsia-500 hover:to-fuchsia-600 hover:shadow-[0_10px_22px_-10px_rgba(217,70,239,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500/50 active:scale-[0.99]"
                    >
                      <span>{busy ? "Please wait..." : "Sign up"}</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-neutral-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-neutral-900/60 px-2 text-xs text-neutral-500">or continue with</span>
                    </div>
                  </div>

                  <GoogleButton onClick={handleGoogle} label="Sign up with Google" accent="fuchsia" />
                </div>
              )}

              {/* Status message */}
              {message && (
                <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-400" : "text-emerald-400"}`}>
                  {message.text}
                </p>
              )}
            </div>

            {/* Footnote */}
            <div className="px-4 sm:px-6 pb-6">
              <p className="text-[13px] leading-relaxed text-neutral-500">
                By continuing, you agree to our{" "}
                <a href="#" className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 hover:text-neutral-100">Terms</a>
                {" "}and{" "}
                <a href="#" className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 hover:text-neutral-100">Privacy Policy</a>.
              </p>
            </div>
          </div>

          {/* Help */}
          <div className="mt-6 flex items-center justify-between text-sm text-neutral-500">
            <div className="inline-flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Need help? <a href="#" className="text-neutral-300 hover:text-neutral-100 underline underline-offset-4 decoration-neutral-700">Contact support</a></span>
            </div>
            <div className="hidden sm:block text-neutral-500">
              <span className="align-middle">v1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Visual Panel */}
      <div className="relative hidden lg:block">
        <Image
          src="/images/auth-side.jpg"
          alt="Ambient visuals"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-10">
          <div className="max-w-lg">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/40 px-3 py-1 text-xs text-neutral-300 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span>Secure. Fast. Minimal.</span>
            </div>
            <h3 className="text-3xl font-semibold tracking-tight">Access your workspace</h3>
            <p className="mt-3 text-neutral-300/90">
              Sign in to continue where you left off. Your data is protected with industry-leading security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
