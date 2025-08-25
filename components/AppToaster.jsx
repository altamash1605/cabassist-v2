"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = e => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function AppToaster() {
  // Tailwind 'sm' breakpoint = 640px
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Toaster
      position={isMobile ? "top-center" : "top-right"}
      theme="dark"
      richColors
      closeButton
      // Optional styling to match your glass theme
      toastOptions={{
        classNames: {
          toast: "rounded-xl border border-neutral-800 bg-neutral-900/90 backdrop-blur",
          title: "text-neutral-100",
          description: "text-neutral-300"
        }
      }}
    />
  );
}
