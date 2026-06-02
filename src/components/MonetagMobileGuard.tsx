"use client";

import { useEffect } from "react";
import { startMonetagMobileGuard } from "@/lib/monetag-cleanup";
import { isMobileAdViewport } from "@/lib/monetag";

/** Runs before/at hydration on mobile: block SW, strip tag, remove floating Monetag UI. */
export default function MonetagMobileGuard() {
  useEffect(() => {
    if (!isMobileAdViewport()) return undefined;
    return startMonetagMobileGuard();
  }, []);

  return null;
}
