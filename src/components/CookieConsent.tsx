"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "gptoapk-cookie-consent";

type ConsentChoice = "accepted" | "rejected" | null;

const messages: Record<string, { title: string; body: string; accept: string; reject: string }> = {
  en: {
    title: "We use cookies & ads",
    body: "We use cookies and similar technologies to operate this website, support analytics, and serve personalized ads via Google AdSense. By clicking Accept, you consent to the use of cookies for advertising and analytics. You can change your choice anytime via our Privacy Policy.",
    accept: "Accept All",
    reject: "Reject Non‑Essential",
  },
  zh: {
    title: "我们使用 Cookie 和广告",
    body: "我们使用 Cookie 和类似技术来运行本网站、支持分析和通过 Google AdSense 提供个性化广告。点击「接受」即表示您同意将 Cookie 用于广告和分析目的。您可随时通过隐私政策更改设置。",
    accept: "全部接受",
    reject: "拒绝非必要",
  },
};

// Google Consent Mode v2 – update defaults based on user choice
function applyGoogleConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Array<unknown> };
  w.dataLayer = w.dataLayer ?? [];
  function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  }
  gtag("consent", "default", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
    wait_for_update: 500,
  });
  // Signal consent update so GTM/GA tags pick up the change
  w.dataLayer.push({ event: "cookie_consent_update" });
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [visible, setVisible] = useState(false);
  const [locale, setLocale] = useState<"en" | "zh">("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentChoice;
    if (stored) {
      setChoice(stored);
      applyGoogleConsent(stored === "accepted");
    } else {
      setVisible(true);
      // Default deny until user makes a choice
      applyGoogleConsent(false);
    }

    const lang = document.documentElement.lang;
    setLocale(lang === "zh" || lang === "zh-Hans" ? "zh" : "en");
  }, []);

  function handleConsent(value: ConsentChoice) {
    localStorage.setItem(STORAGE_KEY, value ?? "");
    setChoice(value);
    setVisible(false);
    applyGoogleConsent(value === "accepted");
  }

  if (!visible) return null;

  const t = messages[locale] ?? messages.en;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-2xl">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
            {t.title}
          </h3>
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            {t.body}{" "}
            <Link
              href="/privacy"
              className="text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
            >
              {locale === "zh" ? "隐私政策" : "Privacy Policy"}
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleConsent("rejected")}
            className="px-4 py-2 text-xs font-medium rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            {t.reject}
          </button>
          <button
            onClick={() => handleConsent("accepted")}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
