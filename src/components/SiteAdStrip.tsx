"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AdPlacement from "@/components/AdPlacement";
import { hasAdvertisingConsent } from "@/lib/cookie-consent";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookie-consent";
import { isMonetagExcludedPath } from "@/lib/monetag";

export default function SiteAdStrip() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

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

  if (isMonetagExcludedPath(pathname) || !hasConsent) return null;

  return (
    <div className="border-t border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <AdPlacement minHeight={100} loadTag label="Advertisement" />
      </div>
    </div>
  );
}
