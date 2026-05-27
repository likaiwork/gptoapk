"use client";

import { useEffect, useRef, useState } from "react";
import { hasAdvertisingConsent } from "@/lib/cookie-consent";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
import { MONETAG_MAIN_ZONE } from "@/lib/monetag";
import { injectMonetagTagScript } from "@/lib/monetag-inpage";

type AdPlacementProps = {
  className?: string;
  minHeight?: number;
  label?: string;
  /** Reserve a slot and load the Monetag tag when consent is granted */
  loadTag?: boolean;
  showPlaceholder?: boolean;
};

export default function AdPlacement({
  className = "",
  minHeight = 90,
  label = "Advertisement",
  loadTag = true,
  showPlaceholder = true,
}: AdPlacementProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const [tagRequested, setTagRequested] = useState(false);

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
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;

    if (!loadTag || !hasConsent || tagRequested) return;

    // Temporary: avoid intrusive popups/push prompts on mobile.
    if (isMobile) return;

    setTagRequested(true);
    requestAnimationFrame(() => injectMonetagTagScript());
  }, [loadTag, hasConsent, tagRequested]);

  if (!hasConsent) return null;

  const slot = (
    <div
      ref={slotRef}
      className={`monetag-slot w-full ${className}`}
      data-zone={MONETAG_MAIN_ZONE}
      style={{ minHeight }}
      aria-label={label}
    />
  );

  if (!showPlaceholder) return slot;

  return (
    <aside
      className={`ad-placement w-full overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/40 ${className}`}
      style={{ minHeight }}
      aria-label={label}
    >
      <p className="px-3 pt-2 text-[10px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      {slot}
    </aside>
  );
}
