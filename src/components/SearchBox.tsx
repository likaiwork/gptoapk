"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { localePathRegex } from "@/lib/site-locales";
import type { SiteLocale } from "@/lib/site-locales";
import { searchUi } from "@/lib/search-ui";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/client-analytics";

type FetchInfoResponse = {
  error?: string;
  appId?: string;
  lang?: string;
  country?: string;
};

function getInputType(value: string) {
  return value.includes("play.google.com") ? "google_play_url" : "package_name";
}

export default function SearchBox() {
  const [url, setUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const localeMatch = pathname.match(localePathRegex);
  const locale = (localeMatch?.[1] as SiteLocale | undefined) ?? "en";
  const ui = searchUi[locale] ?? searchUi.en;

  const isLoading = isFetching || isPending;

  const handleGenerate = async () => {
    const query = url.trim();
    const startedAt = performance.now();

    trackEvent(analyticsEvents.searchSubmit, {
      locale,
      input_type: query ? getInputType(query) : "empty",
      path: pathname,
    });

    if (!query) {
      setError(ui.emptyError);
      trackEvent(analyticsEvents.parseFailed, {
        locale,
        reason: "empty_input",
        duration_ms: Math.round(performance.now() - startedAt),
      });
      return;
    }

    setIsFetching(true);
    setError("");

    try {
      const res = await fetch(`/api/fetch-info?url=${encodeURIComponent(query)}`);
      const data = (await res.json()) as FetchInfoResponse;

      if (!res.ok || !data.appId) {
        throw new Error(data.error || "Failed to fetch app info");
      }

      trackEvent(analyticsEvents.parseSuccess, {
        app_id: data.appId,
        locale,
        lang: data.lang,
        country: data.country,
        input_type: getInputType(query),
        duration_ms: Math.round(performance.now() - startedAt),
      });

      const queryParams = new URLSearchParams();
      if (data.lang && data.lang !== 'en') queryParams.append('hl', data.lang);
      if (data.country && data.country !== 'us') queryParams.append('gl', data.country);

      const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const target = `/app/${data.appId}${queryString}`;

      startTransition(() => {
        router.push(target);
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to fetch app info";
      trackEvent(analyticsEvents.parseFailed, {
        locale,
        input_type: getInputType(query),
        reason: message,
        duration_ms: Math.round(performance.now() - startedAt),
      });
      setError(message);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-slate-800 p-2 sm:p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            className="block w-full pl-12 pr-4 py-4 text-base sm:text-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 dark:text-white" 
            placeholder={ui.placeholder}
            disabled={isLoading}
          />
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-lg whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {ui.processing}
            </>
          ) : (
            <>
              {ui.button}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
