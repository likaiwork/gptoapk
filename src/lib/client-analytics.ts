"use client";

import type { AnalyticsEventName, AnalyticsParams } from "@/lib/analytics-events";

type GtagCommand = "config" | "event" | "js" | "set";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, target: string | Date, params?: AnalyticsParams) => void;
    clarity?: (command: "event", eventName: string) => void;
  }
}

function cleanParams(params: AnalyticsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  ) as Record<string, string | number | boolean>;
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const eventParams = cleanParams(params);
  if (window.gtag) {
    window.gtag("event", eventName, eventParams);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", eventName, eventParams]);
  }
  window.clarity?.("event", eventName);
}

export function trackPageView(path: string) {
  if (typeof window === "undefined") return;

  const pageParams = {
    page_location: window.location.href,
    page_path: path,
    page_title: document.title,
  };

  if (window.gtag) {
    window.gtag("event", "page_view", pageParams);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", "page_view", pageParams]);
  }
}
