"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePathRegex } from "@/lib/site-locales";
import type { SiteLocale } from "@/lib/site-locales";
import { searchUi } from "@/lib/search-ui";
import { proxyImageUrl } from "@/lib/image-proxy";
import { analyticsEvents } from "@/lib/analytics-events";
import { trackEvent } from "@/lib/client-analytics";
import DownloadButton from "@/components/DownloadButton";
import { getMirrorUnavailableMessage } from "@/lib/download-errors";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import {
  getSearchCacheKey,
  SEARCH_RESET_EVENT,
  shouldRestoreSearchFromCache,
} from "@/lib/search-cache";
import { stripSearchQueryNoise } from "@/lib/search-query-normalize";

type QueryType = "url" | "package" | "keyword";

type SearchResult = {
  appId: string;
  title: string;
  summary: string | null;
  developer: string | null;
  developerId: string | null;
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

type SearchFallback = {
  href: string;
  label: string;
};

const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

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
      noResultsError: "未找到相关应用，请换关键词或粘贴 Google Play 链接。",
      placeholder: "输入应用名称、Google Play 链接或包名",
      results: "搜索结果",
      singleResult: "找到 1 个应用",
      multipleResults: (count: number) => `找到 ${count} 个相关应用`,
      exactMatch: "已找到匹配应用",
      openDetails: "查看详情",
      noSummary: "暂无简介",
      fallbackLabel: "试试这个入口",
      playStoreInstall: "前往 Google Play 安装",
      vpnResultsNote: "以下为镜像站可下载的 VPN 应用（NordVPN 等大厂客户端通常不提供公开 APK）。",
      feedbackPrompt: "找不到该 App？",
      feedbackCta: "立即反馈给我们，我们马上处理",
    };
  }

  return {
    emptyError: "Please enter an app name, Google Play link, or package name.",
    noResultsError: "No apps found. Try another keyword or paste a Google Play link.",
    placeholder: "Enter app name, Google Play URL, or package name",
    results: "Search results",
    singleResult: "Found 1 app",
    multipleResults: (count: number) => `Found ${count} related apps`,
    exactMatch: "Matched app found",
    openDetails: "View details",
    noSummary: "No summary available",
    fallbackLabel: "Try this page",
    playStoreInstall: "Install from Google Play",
    vpnResultsNote: "Showing VPN apps available from our download sources. Major brands like NordVPN are not on public mirrors.",
    feedbackPrompt: "Can't find this app?",
    feedbackCta: "Send feedback — we'll add it ASAP",
  };
}

function buildSearchFeedbackMailto(query: string, locale: SiteLocale) {
  const trimmed = query.trim();
  const subject = locale === "zh" ? "App 搜索反馈" : "App search feedback";
  const body =
    locale === "zh"
      ? `搜索关键词：${trimmed || "（未填写）"}\n\n我想找的应用：\n\n补充说明：\n`
      : `Search query: ${trimmed || "(empty)"}\n\nApp I was looking for:\n\nDetails:\n`;
  return `mailto:likaiwork12@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildPlayStoreHref(appId: string, lang?: string, country?: string) {
  const params = new URLSearchParams({ id: appId });
  if (lang) params.set("hl", lang);
  if (country) params.set("gl", country);
  return `https://play.google.com/store/apps/details?${params.toString()}`;
}

function isVpnKeywordQuery(query: string) {
  const q = query.trim().toLowerCase();
  return q === "vpn" || q.includes("vpn") || q.includes("加速器") || q.includes("代理");
}

function getSearchFallback(query: string, locale: SiteLocale): SearchFallback | null {
  const q = query.trim().toLowerCase();
  const stripped = q
    .replace(/(?:官方|官网)?(?:apk|app)?(?:下载|安装|更新).*$/iu, "")
    .replace(/\s+(?:apk|app)$/i, "")
    .trim();

  const pageFallbacks: Array<{ match: (s: string) => boolean; slug: string; label: string }> = [
    { match: (s) => s.includes("vpn") || s.includes("加速器") || s.includes("代理"), slug: "vpn-apk", label: "VPN APK" },
    { match: (s) => s.includes("chatgpt"), slug: "chatgpt-apk", label: "ChatGPT APK" },
    { match: (s) => s.includes("telegram") || s.includes("电报"), slug: "telegram-apk", label: "Telegram APK" },
    { match: (s) => s.includes("instagram") || s === "ins", slug: "instagram-apk", label: "Instagram APK" },
    { match: (s) => s.includes("whatsapp"), slug: "whatsapp-apk", label: "WhatsApp APK" },
    { match: (s) => s.includes("tiktok") || s.includes("抖音国际"), slug: "tiktok-apk", label: "TikTok APK" },
    { match: (s) => s.includes("twitter") || s.includes("推特") || s === "x", slug: "twitter-apk", label: "Twitter / X APK" },
    { match: (s) => s.includes("gemini"), slug: "gemini-apk", label: "Gemini APK" },
    { match: (s) => s.includes("claude"), slug: "claude-apk", label: "Claude APK" },
    { match: (s) => s.includes("deepseek"), slug: "deepseek-apk", label: "DeepSeek APK" },
    { match: (s) => s.includes("豆包") || s.includes("doubao"), slug: "doubao-apk", label: "豆包 APK" },
    { match: (s) => s.includes("zoom"), slug: "zoom-apk", label: "Zoom APK" },
    { match: (s) => s.includes("狗急") || s.includes("gouji"), slug: "vpn-apk", label: "狗急 VPN" },
    { match: (s) => s === "老王" || s.includes("老王") || s.includes("laowang"), slug: "vpn-apk", label: "老王 VPN" },
  ];

  for (const { match, slug, label } of pageFallbacks) {
    if (match(q) || match(stripped)) {
      return { href: `/${locale}/${slug}`, label };
    }
  }

  return null;
}

function getDefaultSearchCountry(locale: SiteLocale): string {
  if (locale === "zh") return "cn";
  return "us";
}

async function fetchSearchApps(query: string, locale: SiteLocale) {
  const country = getDefaultSearchCountry(locale);
  const params = new URLSearchParams({
    q: query,
    hl: locale,
    gl: country,
  });
  const res = await fetch(`/api/search-apps?${params.toString()}`);
  const data = (await res.json().catch(() => ({}))) as SearchAppsResponse;
  return { res, data, country };
}

function buildAppHref(appId: string, lang?: string, country?: string) {
  const queryParams = new URLSearchParams();
  if (lang && lang !== "en") queryParams.append("hl", lang);
  if (country && country !== "us") queryParams.append("gl", country);

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
  return `/app/${encodeURIComponent(appId)}${queryString}`;
}

function buildDeveloperHref(developerId: string | null, developer: string | null, lang?: string, country?: string) {
  const id = developerId || developer;
  if (!id) return "";

  const queryParams = new URLSearchParams();
  queryParams.set("id", id.replace(/\+/g, " "));
  if (lang) queryParams.set("hl", lang);
  if (country) queryParams.set("gl", country);

  return `https://play.google.com/store/apps/developer?${queryParams.toString()}`;
}

function getMetaItems(app: SearchResult) {
  return [
    app.scoreText ? `Rating ${app.scoreText}` : null,
    app.version ? `Version ${app.version}` : null,
    app.size,
    app.priceText,
  ].filter(Boolean);
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
  const [fallback, setFallback] = useState<SearchFallback | null>(null);
  const pathname = usePathname();
  const localeMatch = pathname.match(localePathRegex);
  const locale = (localeMatch?.[1] as SiteLocale | undefined) ?? "en";
  const ui = searchUi[locale] ?? searchUi.en;
  const copy = getLocalizedCopy(locale);
  const cacheKey = getSearchCacheKey(pathname);

  const resetSearchState = () => {
    setUrl("");
    setResults([]);
    setQueryType(null);
    setResultLang("en");
    setResultCountry("us");
    setError("");
    setIsFetching(false);
    setFallback(null);
    clearSearchCache(cacheKey);
  };

  useEffect(() => {
    const onReset = (event: Event) => {
      const detail = (event as CustomEvent<{ pathname?: string }>).detail;
      if (detail?.pathname && detail.pathname !== pathname) return;
      resetSearchState();
    };

    window.addEventListener(SEARCH_RESET_EVENT, onReset);
    return () => window.removeEventListener(SEARCH_RESET_EVENT, onReset);
  }, [cacheKey, pathname]);

  useEffect(() => {
    const restoreFromCache = () => {
      if (!shouldRestoreSearchFromCache()) return;
      const cache = readSearchCache(cacheKey);
      if (!cache?.results.length) return;

      setUrl(cache.query);
      setResults(cache.results);
      setQueryType(cache.queryType);
      setResultLang(cache.resultLang);
      setResultCountry(cache.resultCountry);
      setError("");

      if (typeof cache.scrollY === "number") {
        requestAnimationFrame(() => {
          window.scrollTo({ top: cache.scrollY, behavior: "auto" });
        });
      }
    };

    restoreFromCache();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) restoreFromCache();
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
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
      setFallback(null);
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
    setFallback(null);

    try {
      let { res, data, country: searchCountry } = await fetchSearchApps(query, locale);

      if ((!res.ok || !data.results?.length) && inputType === "app_name") {
        const stripped = stripSearchQueryNoise(query);
        if (stripped.length >= 2 && stripped !== query.trim().toLowerCase()) {
          const retry = await fetchSearchApps(stripped, locale);
          if (retry.res.ok && retry.data.results?.length) {
            res = retry.res;
            data = retry.data;
            searchCountry = retry.country;
          }
        }
      }

      if (!res.ok || !data.results?.length) {
        throw new Error(data.error || "No apps found");
      }

      const nextQueryType = data.queryType ?? "keyword";
      const nextLang = data.lang ?? locale;
      const nextCountry = data.country ?? searchCountry;

      setResults(data.results);
      setQueryType(nextQueryType);
      setResultLang(nextLang);
      setResultCountry(nextCountry);
      setFallback(null);
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
      const rawMessage = err instanceof Error ? err.message : "No apps found";
      const message =
        /^no apps found/i.test(rawMessage) ? copy.noResultsError : rawMessage;
      trackEvent(analyticsEvents.parseFailed, {
        locale,
        input_type: inputType,
        reason: message,
      });
      const queryTypeForLog =
        inputType === "google_play_url" ? "url" : inputType === "package_name" ? "package" : "keyword";
      const isLikelyNetwork =
        err instanceof TypeError ||
        /failed to fetch|networkerror|load failed/i.test(message);
      const failureKind = isLikelyNetwork
        ? "client_error"
        : /^no apps found/i.test(rawMessage) || message === copy.noResultsError
          ? "no_results"
          : "search_error";
      fetch("/api/track-search-failure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          queryType: queryTypeForLog,
          failureKind,
          error: message,
          lang: locale,
          country: getDefaultSearchCountry(locale),
        }),
      }).catch(() => {});
      setError(message);
      setFallback(getSearchFallback(query, locale));
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
        <div className="mt-4 rounded-lg bg-red-100 p-3 text-center text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <p>{error}</p>
          {error !== copy.emptyError && (
            <p className="mt-2 text-red-700 dark:text-red-300">
              {copy.feedbackPrompt}{" "}
              <a
                href={buildSearchFeedbackMailto(url, locale)}
                className="font-semibold underline hover:no-underline"
              >
                {copy.feedbackCta}
              </a>
              {locale === "zh" ? "。" : "."}
            </p>
          )}
          {fallback && (
            <div className="mt-2">
              <Link
                href={fallback.href}
                className="font-semibold underline hover:no-underline"
              >
                {copy.fallbackLabel}: {fallback.label}
              </Link>
            </div>
          )}
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-1 border-b border-slate-100 px-4 py-4 dark:border-slate-700 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {copy.results}
              </p>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {resultHeading}
              </h2>
              {isVpnKeywordQuery(url) && (
                <p className="text-sm text-slate-600 dark:text-slate-300">{copy.vpnResultsNote}</p>
              )}
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {results.map((app) => {
              const metaItems = getMetaItems(app);
              const developerHref = buildDeveloperHref(app.developerId, app.developer, resultLang, resultCountry);
              const iconUrl = proxyImageUrl(app.icon);
              const mirrorBlocked = isUnsupportedNoMirrorApp(app.appId);

              return (
                <article key={app.appId} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                  <div className="flex min-w-0 flex-1 gap-4">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:h-20 sm:w-20">
                        {iconUrl ? (
                          <img
                            src={iconUrl}
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
                          <a
                            href={developerHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block truncate text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {app.developer}
                          </a>
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
                      {mirrorBlocked ? (
                        <div className="w-full max-w-xs space-y-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-left dark:border-amber-900/50 dark:bg-amber-950/30">
                          <p className="text-xs text-amber-900 dark:text-amber-100">
                            {getMirrorUnavailableMessage(locale)}
                          </p>
                          <a
                            href={buildPlayStoreHref(app.appId, resultLang, resultCountry)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center rounded-lg bg-amber-500 px-3 py-2 text-sm font-bold text-white hover:bg-amber-600"
                          >
                            {copy.playStoreInstall}
                          </a>
                        </div>
                      ) : (
                        <DownloadButton appId={app.appId} appName={app.title} compact />
                      )}
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

        </>
      )}
    </div>
  );
}
