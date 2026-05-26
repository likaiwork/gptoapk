"use client";

import { useEffect } from "react";
import { hasAdvertisingConsent } from "@/lib/cookie-consent";
import { MONETAG_MAIN_ZONE, monetagInPagePushScriptUrl } from "@/lib/monetag";

const INPAGE_SCRIPT_ID = `monetag-inpage-${MONETAG_MAIN_ZONE}`;

type AdPlacementProps = {
  className?: string;
  /** Minimum reserved height so layout does not jump */
  minHeight?: number;
  label?: string;
  /**
   * Load dedicated In-Page Push script for this slot.
   * MultiTag in head may already show banners; enable for high-value content slots.
   */
  loadInPagePush?: boolean;
  /** Show dashed placeholder before ad creative loads */
  showPlaceholder?: boolean;
};

export default function AdPlacement({
  className = "",
  minHeight = 90,
  label = "Advertisement",
  loadInPagePush = false,
  showPlaceholder = true,
}: AdPlacementProps) {
  useEffect(() => {
    if (!loadInPagePush || !hasAdvertisingConsent()) return;
    if (document.getElementById(INPAGE_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = INPAGE_SCRIPT_ID;
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = monetagInPagePushScriptUrl();
    document.head.appendChild(script);
  }, [loadInPagePush]);

  if (!showPlaceholder) {
    return (
      <div
        className={`monetag-slot w-full ${className}`}
        data-zone={MONETAG_MAIN_ZONE}
        style={{ minHeight }}
        aria-label={label}
      />
    );
  }

  return (
    <aside
      className={`ad-placement w-full overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/40 ${className}`}
      style={{ minHeight }}
      aria-label={label}
    >
      <p className="px-3 pt-2 text-[10px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <div
        className="monetag-slot px-2 pb-2"
        data-zone={MONETAG_MAIN_ZONE}
      />
    </aside>
  );
}
