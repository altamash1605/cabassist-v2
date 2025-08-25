// app/page.jsx
import Link from "next/link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowRight, ShieldCheck, Zap, Eye } from "lucide-react";
import Brand from "@/components/Brand";


export const metadata = {
    title: "AX — Simple Scheduling",
    description: "Generate clean schedules fast. Secure. Fast. Minimal."
};

export default async function LandingPage() {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();
    const ctaHref = session ? "/dashboard" : "/auth";
    const ctaLabel = session ? "Go to dashboard" : "Get started";

    return (
        <main className="relative min-h-screen bg-neutral-950 text-neutral-100">
            {/* Ambient glow (clip it too) */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40 blur-3xl overflow-hidden"
                aria-hidden="true"
            >
                <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-indigo-600/20"></div>
                <div className="absolute -bottom-16 -right-8 h-72 w-72 rounded-full bg-fuchsia-600/20"></div>
            </div>

            {/* Top nav */}
            <header className="relative z-10 border-b border-neutral-900/80 bg-neutral-950/60 backdrop-blur">
                <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Brand />
                        <span className="text-sm text-neutral-400">Secure • Fast • Minimal</span>
                    </div>

                    {/* Keep header CTA on desktop, hide on mobile (we’ll use hero CTA there) */}
                    <div className="hidden sm:flex items-center gap-2">
                        <Link
                            href={ctaHref}
                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 text-sm hover:border-neutral-700"
                        >
                            {ctaLabel} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative z-10">
                <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:pt-24 sm:pb-16">
                    <h1 className="text-center sm:text-left text-3xl sm:text-5xl font-semibold tracking-tight">
                        Generate schedules without spreadsheets
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left text-neutral-300">
                        Paste employee IDs, pick a range, set times, skip days, and export. Clean CSVs.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                        <Link
                            href={ctaHref}
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-indigo-600 to-indigo-700 px-4 py-2.5 text-sm font-medium text-white shadow-[0_6px_16px_-6px_rgba(99,102,241,0.6)] hover:from-indigo-500 hover:to-indigo-600"
                        >
                            {ctaLabel} <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/auth"
                            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-2.5 text-sm text-neutral-200 hover:border-neutral-700"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="relative z-10">
                <div className="mx-auto max-w-6xl px-5 pb-24">
                    <div className="mx-auto max-w-xl sm:max-w-none grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Feature
                            icon={<Zap className="h-4 w-4" />}
                            title="Fast"
                            text="From IDs to CSV in seconds. No formulas, no fuss."
                        />
                        <Feature
                            icon={<Eye className="h-4 w-4" />}
                            title="Live preview"
                            text="See exactly what you’ll export before you download."
                        />
                        <Feature
                            icon={<ShieldCheck className="h-4 w-4" />}
                            title="Private"
                            text="Built with Supabase auth. Your data stays your own."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-neutral-900/80 bg-neutral-950/60">
                <div className="mx-auto max-w-6xl px-5 py-6 text-center sm:text-left text-xs text-neutral-500">
                    © {new Date().getFullYear()} CabAssist — Secure. Fast. Minimal.
                </div>
            </footer>
        </main>
    );
}

function Feature({ icon, title, text }) {
    return (
        <div className="rounded-2xl border border-neutral-900 bg-neutral-900/40 backdrop-blur p-4 text-center sm:text-left">
            <div className="inline-flex sm:flex items-center gap-2 text-neutral-300">
                {/* center icon on mobile */}
                <span className="mx-auto sm:mx-0">{icon}</span>
                <span className="text-sm font-medium">{title}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-400">{text}</p>
        </div>
    );
}
