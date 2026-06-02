"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  hasAdvertisingConsent,
} from "@/lib/cookie-consent";
import { injectMonetagTagScript } from "@/lib/monetag-inpage";
import { isMonetagExcludedPath } from "@/lib/monetag";

/**
 * Loads Monetag tag.min.js after cookie consent (desktop + mobile, except download pages).
 * Tune popunder / onclick formats in the Monetag dashboard if needed.
 */
export default function MonetagLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (isMonetagExcludedPath(pathname)) return;

    const maybeLoad = () => {
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
