"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  hasAdvertisingConsent,
} from "@/lib/cookie-consent";
import { injectMonetagTagScript } from "@/lib/monetag-inpage";
import { teardownMonetagOnMobile } from "@/lib/monetag-cleanup";
import { isMobileAdViewport, isMonetagExcludedPath } from "@/lib/monetag";

/**
 * Loads Monetag tag.min.js after cookie consent (desktop only on most pages).
 * Mobile skips MultiTag to avoid floating in-page / vignette ads over the search UI.
 */
export default function MonetagLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileAdViewport()) {
      void teardownMonetagOnMobile();
      return;
    }

    if (isMonetagExcludedPath(pathname)) return;

    const maybeLoad = () => {
      if (isMobileAdViewport()) {
        void teardownMonetagOnMobile();
        return;
      }
      if (!hasAdvertisingConsent()) return;
      // Let React paint ad slots (SiteAdStrip) before the tag scans the DOM.
      requestAnimationFrame(() => {
        injectMonetagTagScript();
      });
    };

    maybeLoad();

    const onStorage = (event: StorageEvent) => {
      if (event.key === COOKIE_CONSENT_STORAGE_KEY) maybeLoad();
    };
    const onConsent = () => maybeLoad();

    window.addEventListener("storage", onStorage);
    window.addEventListener("gptoapk-cookie-consent", onConsent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("gptoapk-cookie-consent", onConsent);
    };
  }, [pathname]);

  return null;
}
