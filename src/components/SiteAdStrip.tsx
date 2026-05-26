"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AdPlacement from "@/components/AdPlacement";
import { hasAdvertisingConsent } from "@/lib/cookie-consent";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
import { isMonetagExcludedPath } from "@/lib/monetag";

/**
 * Bottom-of-page ad slot on content pages (blog, home, search results via layout).
 * Excludes app download detail routes to avoid misclicks near Download.
 */
export default function SiteAdStrip() {
  const pathname = usePathname();
  const [showAds, setShowAds] = useState(false);

  useEffect(() => {
    const sync = () => setShowAds(hasAdvertisingConsent());
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

  if (isMonetagExcludedPath(pathname) || !showAds) return null;

  return (
    <div className="border-t border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <AdPlacement minHeight={100} loadInPagePush showPlaceholder />
      </div>
    </div>
  );
}
