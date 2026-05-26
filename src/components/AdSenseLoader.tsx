"use client";

import { useEffect } from "react";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  hasAdvertisingConsent,
} from "@/lib/cookie-consent";

const ADSENSE_CLIENT = "ca-pub-7016978419299209";
const ADSENSE_SCRIPT_ID = "gptoapk-adsense";

function injectAdSenseScript() {
  if (typeof document === "undefined") return;
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

/**
 * Loads Google AdSense only after the user accepts advertising cookies.
 * Keeps the global tag out of <head> so Auto ads do not run before consent.
 */
export default function AdSenseLoader() {
  useEffect(() => {
    const maybeLoad = () => {
      if (hasAdvertisingConsent()) injectAdSenseScript();
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
  }, []);

  return null;
}
