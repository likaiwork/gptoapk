"use client";

import { useEffect, useRef, useState } from "react";
import {
  ADSTERRA_NATIVE_BANNER_CONTAINER_ID,
  ADSTERRA_NATIVE_BANNER_SCRIPT_SRC,
  isAdsterraNativeBannerConfigured,
} from "@/lib/adsterra";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  hasAdvertisingConsent,
} from "@/lib/cookie-consent";

const SCRIPT_ELEMENT_ID = "adsterra-native-banner-script";

/**
 * Homepage Adsterra Native Banner slot.
 *
 * - Only renders after advertising consent, matching the site's cookie-consent gate.
 * - Adsterra's async snippet expects its <script> immediately before the
 *   container element, so we inject it in place. next/script would append the
 *   script at the end of <body>, which breaks that ordering.
 * - A single script id guards against double loading (Adsterra warns that
 *   using the same Native Banner code twice on one page corrupts statistics).
 * - Renders nothing until configured and until consent is granted, so the
 *   slot never shifts the layout or fires a third-party request before then.
 */
export default function AdsterraNativeBanner() {
  const [hasConsent, setHasConsent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => setHasConsent(hasAdvertisingConsent());
    const onStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_STORAGE_KEY) sync();
    };
    sync();
    window.addEventListener("gptoapk-cookie-consent", sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("gptoapk-cookie-consent", sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!isAdsterraNativeBannerConfigured() || !hasConsent) return;
    const container = containerRef.current;
    if (!container || document.getElementById(SCRIPT_ELEMENT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ELEMENT_ID;
    script.setAttribute("async", "async");
    script.setAttribute("data-cfasync", "false");
    script.src = ADSTERRA_NATIVE_BANNER_SCRIPT_SRC;
    container.parentNode?.insertBefore(script, container);

    return () => {
      script.remove();
    };
  }, [hasConsent]);

  if (!isAdsterraNativeBannerConfigured() || !hasConsent) return null;

  return (
    <div className="mt-20 w-full max-w-5xl">
      <aside
        className="ad-placement w-full overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-3 py-3 dark:border-slate-700 dark:bg-slate-900/40"
        aria-label="Advertisement"
      >
        <p className="pb-2 text-[10px] font-medium uppercase tracking-wide text-slate-400">
          Advertisement
        </p>
        <div
          id={ADSTERRA_NATIVE_BANNER_CONTAINER_ID}
          ref={containerRef}
          className="w-full"
        />
      </aside>
    </div>
  );
}
