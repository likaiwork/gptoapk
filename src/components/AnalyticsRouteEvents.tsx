"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent, trackPageView } from "@/lib/client-analytics";
import { localePathRegex } from "@/lib/site-locales";
import type { SiteLocale } from "@/lib/site-locales";

const SESSION_VISIT_KEY = "gptoapk_site_visit_sent";

function getLocale(pathname: string) {
  const localeMatch = pathname.match(localePathRegex);
  return (localeMatch?.[1] as SiteLocale | undefined) ?? "en";
}

export default function AnalyticsRouteEvents() {
  const pathname = usePathname();
  const skippedInitialPageView = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_VISIT_KEY)) return;

    sessionStorage.setItem(SESSION_VISIT_KEY, "1");
    trackEvent(analyticsEvents.siteVisit, {
      path: pathname,
      locale: getLocale(pathname),
    });
  }, [pathname]);

  useEffect(() => {
    const query = window.location.search.slice(1);
    const path = query ? `${pathname}?${query}` : pathname;

    if (!skippedInitialPageView.current) {
      skippedInitialPageView.current = true;
      return;
    }

    trackPageView(path);
  }, [pathname]);

  return null;
}
