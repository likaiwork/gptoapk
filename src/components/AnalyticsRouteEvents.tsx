"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent, trackPageView } from "@/lib/client-analytics";
import { localePathRegex } from "@/lib/site-locales";
import type { SiteLocale } from "@/lib/site-locales";

const SESSION_VISIT_KEY = "gptoapk_site_visit_sent";

// 初始化访客ID（用cookie，这样会自动带到服务端请求头）
function initVisitorId() {
  const key = 'visitor_id';
  const match = document.cookie.match(new RegExp(`(?:^|;\s*)${key}=([^;]*)`));
  if (match) return match[1];

  const vid = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2,10)}`;
  // 设置365天过期
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${key}=${vid}; path=/; expires=${expires}; SameSite=Lax`;
  return vid;
}

function getLocale(pathname: string) {
  const localeMatch = pathname.match(localePathRegex);
  return (localeMatch?.[1] as SiteLocale | undefined) ?? "en";
}

export default function AnalyticsRouteEvents() {
  const pathname = usePathname();
  const skippedInitialPageView = useRef(false);

  useEffect(() => {
    // 初始化visitor_id + 注册访客到数据库
    initVisitorId();
    fetch('/api/visitor', { method: 'GET', credentials: 'include' }).catch(() => {});

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
