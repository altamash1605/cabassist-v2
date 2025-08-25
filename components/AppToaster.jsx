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
  // Tailwind 'sm' = 640px
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Toaster
      position={isMobile ? "top-center" : "top-right"}
      theme="dark"
      richColors
      closeButton
      // tighten spacing a touch if you like
      offset={12}
      toastOptions={{
        classNames: {
          // Make the toast *slightly* narrower on mobile
          toast: `${
            isMobile ? "w-[93vw] max-w-[93vw]" : "w-auto max-w-[93vw]"
          } rounded-xl border border-neutral-800/80 bg-neutral-900/90 backdrop-blur px-3 py-3`,
          title: "text-neutral-100",
          description: "text-neutral-300",
          actionButton: "rounded-lg",
          cancelButton: "rounded-lg"
        }
      }}
    />
  );
}
