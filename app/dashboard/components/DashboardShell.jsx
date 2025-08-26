"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Joyride, { STATUS } from "react-joyride";
import { getBrowserClient } from "@/lib/supabase-browser";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import CSVGenerator from "./CSVGenerator";

export default function DashboardShell() {
  const supabase = useMemo(() => getBrowserClient(), []);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [hasNew, setHasNew] = useState(false);   // red dot on bell
  const [runTour, setRunTour] = useState(false); // joyride state

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;

      if (!data?.user) {
        router.replace("/auth");
        return;
      }
      setEmail(data.user.email ?? "");
      // show red dot if user hasn't seen the tour yet (metadata flag missing/false)
      const seen = !!data.user.user_metadata?.has_seen_tour;
      setHasNew(!seen);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [supabase, router]);

  async function markTourSeen() {
    try {
      await supabase.auth.updateUser({ data: { has_seen_tour: true } });
    } catch (_) {}
    setHasNew(false);
  }

  function startTour() {
    setRunTour(true);
  }

  function onTourEnd(data) {
    const finished = [STATUS.FINISHED, STATUS.SKIPPED].includes(data.status);
    if (finished) {
      setRunTour(false);
      // user accepted or skipped → stop showing badge
      markTourSeen();
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/auth");
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-neutral-950 text-neutral-300">
        <div className="animate-pulse text-sm">Loading your workspace…</div>
      </div>
    );
  }

  // Joyride steps: we target elements annotated in CSVGenerator with data-tour="..."
  const steps = [
    {
      target: '[data-tour="ids"]',
      title: "Add employees",
      content: "Paste or type employee IDs. Commas, spaces, or new lines are all fine.",
      disableBeacon: true,
    },
    {
      target: '[data-tour="dates"]',
      title: "Pick your date range",
      content: "Choose the first and last working day for this schedule.",
    },
    {
      target: '[data-tour="times"]',
      title: "Set shift timings",
      content: "Enter login and logout times. If it’s a night shift, turn on Next day logout.",
    },
    {
      target: '[data-tour="options"]',
      title: "Skip days",
      content: "Skip weekends or any weekdays you don’t need. The preview updates instantly.",
    },
    {
      target: '[data-tour="export"]',
      title: "Preview & export",
      content: "Download the CSV or share it. On desktop, the live preview is on the right.",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Guided tour */}
      <Joyride
        run={runTour}
        steps={steps}
        continuous
        showSkipButton
        showProgress
        disableOverlayClose
        styles={{
          options: {
            zIndex: 9999,
            primaryColor: "#6366f1",
            textColor: "#e5e5e5",
            backgroundColor: "#0f0f10",
            arrowColor: "#0f0f10",
            overlayColor: "rgba(0,0,0,0.78)", // darker mask over the rest of the screen
          },
          tooltip: {
            border: "1px solid #1f1f1f",
            borderRadius: 12,
          },
          buttonNext: {
            borderRadius: 10,
          },
          buttonBack: {
            color: "#a3a3a3",
          },
          spotlight: {
            borderRadius: 12,
          },
        }}
        callback={onTourEnd}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <Sidebar />
        <main className="min-h-screen border-l border-neutral-900 bg-neutral-950/60">
          <Topbar
            email={email}
            onSignOut={signOut}
            hasNew={hasNew}
            onStartTour={() => {
              setRunTour(true);
            }}
            onDismissNew={markTourSeen}
          />
          <div className="px-6 sm:px-10 pb-12">
            <CSVGenerator />
          </div>
        </main>
      </div>
    </div>
  );
}
