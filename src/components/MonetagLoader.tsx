"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  hasAdvertisingConsent,
} from "@/lib/cookie-consent";
import { injectMonetagInPageScript } from "@/lib/monetag-inpage";
import {
  isMonetagExcludedPath,
  MONETAG_MAIN_ZONE,
  MONETAG_MULTITAG_ENABLED,
  MONETAG_TAG_SCRIPT_SRC,
} from "@/lib/monetag";

const MULTITAG_SCRIPT_ID = `monetag-multitag-${MONETAG_MAIN_ZONE}`;

function injectMultiTagScript() {
  if (typeof document === "undefined") return;
  if (document.getElementById(MULTITAG_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = MULTITAG_SCRIPT_ID;
  script.src = MONETAG_TAG_SCRIPT_SRC;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  script.setAttribute("data-zone", String(MONETAG_MAIN_ZONE));
  document.head.appendChild(script);
}

/**
 * Loads Monetag after cookie consent.
 * Default: in-page banners only. Set NEXT_PUBLIC_MONETAG_MULTITAG=true for popunder/vignette.
 */
export default function MonetagLoader() {
  const pathname = usePathname();

  useEffect(() => {
    if (isMonetagExcludedPath(pathname)) return;

    const maybeLoad = () => {
      if (!hasAdvertisingConsent()) return;
      if (MONETAG_MULTITAG_ENABLED) {
        injectMultiTagScript();
      } else {
        injectMonetagInPageScript();
      }
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
