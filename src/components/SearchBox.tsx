"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePathRegex } from "@/lib/site-locales";
import type { SiteLocale } from "@/lib/site-locales";
import { searchUi } from "@/lib/search-ui";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/client-analytics";
import DownloadButton from "@/components/DownloadButton";
import AdUnit from "@/components/AdUnit";

type QueryType = "url" | "package" | "keyword";

type SearchResult = {
  appId: string;
  title: string;
  summary: string | null;
  developer: string | null;
  icon: string | null;
  score: number | null;
  scoreText: string | null;
  priceText: string | null;
  free: boolean | null;
  version: string | null;
  size: string | null;
  updated: string | null;
  url: string | null;
};

type SearchAppsResponse = {
  error?: string;
  query?: string;
  queryType?: QueryType;
  lang?: string;
  country?: string;
  results?: SearchResult[];
};

type SearchCache = {
  query: string;
  queryType: QueryType | null;
  resultLang: string;
  resultCountry: string;
  results: SearchResult[];
  scrollY?: number;
};

const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;
const SEARCH_CACHE_PREFIX = "gptoapk.searchState:";

function getInputType(value: string) {
  if (!value) return "empty";
  if (value.includes("play.google.com")) return "google_play_url";
  if (PACKAGE_NAME_REGEX.test(value)) return "package_name";
  return "app_name";
}

function getLocalizedCopy(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      emptyError: "请输入应用名称、Google Play 链接或包名。",
      placeholder: "输入应用名称、Google Play 链接或包名",
      results: "搜索结果",
      singleResult: "找到 1 个应用",
      multipleResults: (count: number) => `找到 ${count} 个相关应用`,
      exactMatch: "已找到匹配应用",
      openDetails: "查看详情",
      noSummary: "暂无简介",
    };
  }

  return {
    emptyError: "Please enter an app name, Google Play link, or package name.",
    placeholder: "Enter app name, Google Play URL, or package name",
    results: "Search results",
    singleResult: "Found 1 app",
    multipleResults: (count: number) => `Found ${count} related apps`,
    exactMatch: "Matched app found",
    openDetails: "View details",
    noSummary: "No summary available",
  };
}

function buildAppHref(appId: string, lang?: string, country?: string) {
  const queryParams = new URLSearchParams();
  if (lang && lang !== "en") queryParams.append("hl", lang);
  if (country && country !== "us") queryParams.append("gl", country);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return `/app/${encodeURIComponent(appId)}${queryString}`;
}

function getMetaItems(app: SearchResult) {
  return [
    app.scoreText ? `Rating ${app.scoreText}` : null,
    app.version ? `Version ${app.version}` : null,
    app.size,
    app.priceText,
  ].filter(Boolean);
}

function getSearchCacheKey(pathname: string) {
  return `${SEARCH_CACHE_PREFIX}${pathname}`;
}

function isSearchCache(value: unknown): value is SearchCache {
  if (!value || typeof value !== "object") return false;
  const cache = value as Partial<SearchCache>;
  return (
    typeof cache.query === "string" &&
    Array.isArray(cache.results) &&
    typeof cache.resultLang === "string" &&
    typeof cache.resultCountry === "string"
  );
}

function readSearchCache(cacheKey: string) {
  try {
    const raw = sessionStorage.getItem(cacheKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    return isSearchCache(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function writeSearchCache(cacheKey: string, cache: SearchCache) {
  try {
    sessionStorage.setItem(cacheKey, JSON.stringify(cache));
  } catch {
    // Ignore storage quota/private mode errors; search still works without persistence.
  }
}

function clearSearchCache(cacheKey: string) {
  try {
    sessionStorage.removeItem(cacheKey);
  } catch {
    // Ignore storage errors.
  }
}

export default function SearchBox() {
  const [url, setUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [queryType, setQueryType] = useState<QueryType | null>(null);
  const [resultLang, setResultLang] = useState("en");
  const [resultCountry, setResultCountry] = useState("us");
  const pathname = usePathname();
  const localeMatch = pathname.match(localePathRegex);
  const locale = (localeMatch?.[1] as SiteLocale | undefined) ?? "en";
  const ui = searchUi[locale] ?? searchUi.en;
  const copy = getLocalizedCopy(locale);
  const cacheKey = getSearchCacheKey(pathname);

  useEffect(() => {
    const cache = readSearchCache(cacheKey);
    if (!cache?.results.length) return;

    let scrollFrame: number | undefined;
    const restoreFrame = requestAnimationFrame(() => {
      setUrl(cache.query);
      setResults(cache.results);
      setQueryType(cache.queryType);
      setResultLang(cache.resultLang);
      setResultCountry(cache.resultCountry);
      setError("");

      if (typeof cache.scrollY === "number") {
        scrollFrame = requestAnimationFrame(() => {
          window.scrollTo({ top: cache.scrollY, behavior: "auto" });
        });
      }
    });

    return () => {
      cancelAnimationFrame(restoreFrame);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, [cacheKey]);

  const handleGenerate = async () => {
    const query = url.trim();
    const inputType = getInputType(query);

    trackEvent(analyticsEvents.searchSubmit, {
      locale,
      input_type: inputType,
      path: pathname,
    });

    if (!query) {
      setError(copy.emptyError);
      setResults([]);
      clearSearchCache(cacheKey);
      trackEvent(analyticsEvents.parseFailed, {
        locale,
        reason: "empty_input",
      });
      return;
    }

    setIsFetching(true);
    setError("");
    setResults([]);

    try {
      const params = new URLSearchParams({
        q: query,
        hl: locale,
        gl: "us",
      });
      const res = await fetch(`/api/search-apps?${params.toString()}`);
      const data = (await res.json().catch(() => ({}))) as SearchAppsResponse;

      if (!res.ok || !data.results?.length) {
        throw new Error(data.error || "No apps found");
      }

      const nextQueryType = data.queryType ?? "keyword";
      const nextLang = data.lang ?? locale;
      const nextCountry = data.country ?? "us";

      setResults(data.results);
      setQueryType(nextQueryType);
      setResultLang(nextLang);
      setResultCountry(nextCountry);
      writeSearchCache(cacheKey, {
        query,
        queryType: nextQueryType,
        resultLang: nextLang,
        resultCountry: nextCountry,
        results: data.results,
      });

      trackEvent(analyticsEvents.parseSuccess, {
        app_id: data.results[0]?.appId,
        locale,
        lang: data.lang,
        country: data.country,
        input_type: inputType,
        query_type: data.queryType,
        result_count: data.results.length,
      });

      // 记录搜索到数据库
      if (data.results[0]?.appId) {
        fetch('/api/track-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query,
            queryType: nextQueryType,
            appId: data.results[0].appId,
            appTitle: data.results[0].title,
          }),
        }).catch(() => {});
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "No apps found";
      trackEvent(analyticsEvents.parseFailed, {
        locale,
        input_type: inputType,
        reason: message,
      });
      setError(message);
      clearSearchCache(cacheKey);
    } finally {
      setIsFetching(false);
    }
  };

  const saveCurrentSearchPosition = () => {
    if (!results.length) return;

    writeSearchCache(cacheKey, {
      query: url,
      queryType,
      resultLang,
      resultCountry,
      results,
      scrollY: window.scrollY,
    });
  };

  const resultHeading =
    queryType === "keyword"
      ? copy.multipleResults(results.length)
      : results.length === 1
        ? copy.exactMatch
        : copy.singleResult;

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
            placeholder={copy.placeholder}
            disabled={isFetching}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isFetching}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 text-lg whitespace-nowrap"
        >
          {isFetching ? (
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

      {results.length > 0 && (
        <>
          {/* 搜索结果上方广告 */}
          <AdUnit slot="1234567890" format="auto" className="mt-6" />

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-4 py-4 dark:border-slate-700 sm:px-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              {copy.results}
            </p>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {resultHeading}
            </h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {results.map((app) => {
              const metaItems = getMetaItems(app);

              return (
                <article key={app.appId} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:h-20 sm:w-20">
                      {app.icon ? (
                        <img
                          src={app.icon}
                          alt={`${app.title} icon`}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200 dark:bg-slate-700" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-base font-bold text-slate-950 dark:text-white sm:text-lg">
                        {app.title}
                      </h3>
                      {app.developer && (
                        <p className="truncate text-sm font-medium text-blue-600 dark:text-blue-400">
                          {app.developer}
                        </p>
                      )}
                      <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">
                        {app.appId}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                        {app.summary || copy.noSummary}
                      </p>
                      {metaItems.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {metaItems.map((item) => (
                            <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                    <DownloadButton appId={app.appId} appName={app.title} compact />
                    <Link
                      href={buildAppHref(app.appId, resultLang, resultCountry)}
                      onClick={saveCurrentSearchPosition}
                      className="text-center text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 sm:text-right"
                    >
                      {copy.openDetails}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

          {/* 搜索结果下方广告 */}
          <AdUnit slot="0987654321" format="auto" className="mt-5" />
        </>
      )}
    </div>
  );
}
