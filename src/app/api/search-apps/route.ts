import { NextResponse } from 'next/server';
import gplay, { type IAppItem, type IAppItemFullDetail } from 'google-play-scraper';
import { gplayRequestOptions as requestOptions } from '@/lib/proxy';
import { proxyImageUrl } from '@/lib/image-proxy';
import { isUnsupportedNoMirrorApp } from '@/lib/unsupported-no-mirror-apps';
import { VPN_DOWNLOADABLE_APP_IDS } from '@/lib/vpn-downloadable-apps';
import { buildCuratedSearchResult, getCuratedSearchAppMeta } from '@/lib/curated-search-apps';
import { resolvePlayPackageIdAlias, resolveSearchAliasAppIds } from '@/lib/search-aliases';
import { recordSearchFailure, recordSearchSuccess } from '@/lib/record-search-failure';
import type { SearchFailureKind } from '@/lib/search-failure-key';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SEARCH_TIMEOUT_MS = 25000;
const EXACT_TIMEOUT_MS = 20000;
const MAX_QUERY_LENGTH = 200;
const SEARCH_RESULT_LIMIT = 10;
const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;
const SUCCESS_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
};

type QueryType = 'url' | 'package' | 'keyword';

type SearchAppResult = {
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

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

function normalizeLocale(value: string | null, fallback: string) {
  const clean = value?.trim().toLowerCase();
  return clean && /^[a-z]{2}(?:[-_][a-z]{2})?$/.test(clean) ? clean.replace('_', '-') : fallback;
}

function normalizeCountry(value: string | null, fallback: string) {
  const clean = value?.trim().toLowerCase();
  return clean && /^[a-z]{2}$/.test(clean) ? clean : fallback;
}

function parseGooglePlayUrl(query: string) {
  const candidate = /^https?:\/\//i.test(query) ? query : `https://${query}`;

  try {
    const url = new URL(candidate);
    if (!url.hostname.endsWith('play.google.com')) return null;

    const appId = url.searchParams.get('id')?.trim();
    if (!appId) return null;

    return {
      appId,
      lang: normalizeLocale(url.searchParams.get('hl'), 'en'),
      country: normalizeCountry(url.searchParams.get('gl'), 'us'),
    };
  } catch {
    return null;
  }
}

function getQueryType(query: string): QueryType {
  if (query.includes('play.google.com')) return 'url';
  if (PACKAGE_NAME_REGEX.test(query)) return 'package';
  return 'keyword';
}

/** Map common mistaken inputs before query-type detection. */
function normalizeUserSearchQuery(query: string): string {
  const trimmed = query.trim();
  if (/^https?:\/\/(www\.)?grok\.com\/?/i.test(trimmed)) return 'grok';
  if (/^https?:\/\/(www\.)?facebook\.com\/?/i.test(trimmed)) return 'facebook';
  if (/^https?:\/\/(www\.)?messenger\.com\/?/i.test(trimmed)) return 'facebook messenger';
  if (/^https?:\/\/(www\.)?tiktok\.com\/?/i.test(trimmed)) return 'tiktok';
  if (/^https?:\/\/(www\.)?business\.tiktok\.com\/?/i.test(trimmed)) return 'tiktok';
  if (/^https?:\/\/((www|m)\.)?youtube\.com\/?/i.test(trimmed)) return 'youtube';
  if (/^https?:\/\/youtu\.be\//i.test(trimmed)) return 'youtube';
  if (/^https?:\/\/(www\.)?(twitter|x)\.com\/?/i.test(trimmed)) return 'twitter';
  if (/^https?:\/\/(www\.)?whatsapp\.com\/?/i.test(trimmed)) return 'whatsapp';
  if (/^https?:\/\/(www\.)?web\.whatsapp\.com\/?/i.test(trimmed)) return 'whatsapp';
  if (/^https?:\/\/wa\.me\//i.test(trimmed)) return 'whatsapp';
  if (/^https?:\/\/([\w-]+\.)?zoom\.us\//i.test(trimmed)) return 'zoom';
  if (/^zoommtg:/i.test(trimmed)) return 'zoom';
  if (/^https?:\/\/(www\.)?(ibkr|interactivebrokers)\.com\/?/i.test(trimmed)) return 'ibkr';
  if (/^https?:\/\/(www\.)?tigerbrokers\.com\/?/i.test(trimmed)) return 'tiger';
  if (/^https?:\/\/(www\.)?futu\.com\/?/i.test(trimmed)) return 'futu';
  if (/^https?:\/\/(www\.)?longbridge\.com\/?/i.test(trimmed)) return 'longbridge';
  return trimmed;
}

function isVpnKeyword(term: string): boolean {
  const q = term.toLowerCase();
  return (
    q === 'vpn' ||
    q.includes('vpn') ||
    q.includes('virtual private network') ||
    q.includes('加速器') ||
    q.includes('翻墙') ||
    q.includes('代理')
  );
}

function getUpdatedDate(value: unknown) {
  return typeof value === 'number' ? new Date(value).toISOString() : null;
}

function toSearchResult(app: IAppItem | IAppItemFullDetail): SearchAppResult {
  const detail = app as Partial<IAppItemFullDetail>;

  return {
    appId: app.appId,
    title: app.title,
    summary: app.summary || null,
    developer: app.developer || null,
    developerId: app.developerId || null,
    icon: proxyImageUrl(app.icon),
    score: typeof app.score === 'number' ? app.score : null,
    scoreText: app.scoreText || null,
    priceText: app.priceText || null,
    free: typeof app.free === 'boolean' ? app.free : null,
    version: detail.version || null,
    size: detail.size || null,
    updated: getUpdatedDate(detail.updated),
    url: app.url || null,
  };
}

async function fetchExactApp(appId: string, lang: string, country: string) {
  const resolvedAppId = resolvePlayPackageIdAlias(appId);
  const curated = getCuratedSearchAppMeta(resolvedAppId);

  try {
    const appInfo = await withTimeout(
      gplay.app({ appId: resolvedAppId, lang, country, requestOptions } as Parameters<typeof gplay.app>[0]),
      EXACT_TIMEOUT_MS,
      'Network timeout: Cannot connect to Google Play'
    );

    return toSearchResult(appInfo);
  } catch (error) {
    if (curated) return buildCuratedSearchResult(curated);
    throw error;
  }
}

async function searchDownloadableVpnApps(
  lang: string,
  country: string,
): Promise<SearchAppResult[]> {
  const blocked = new Set<string>();
  const merged: SearchAppResult[] = [];

  const push = (item: SearchAppResult) => {
    if (!item.appId || blocked.has(item.appId) || isUnsupportedNoMirrorApp(item.appId)) return;
    blocked.add(item.appId);
    merged.push(item);
  };

  try {
    const fromSearch = await searchApps('vpn', lang, country);
    for (const app of fromSearch) push(app);
  } catch {
    // searchApps may throw; curated list still applies
  }

  const curated = await Promise.allSettled(
    VPN_DOWNLOADABLE_APP_IDS.map((appId) => fetchExactApp(appId, lang, country)),
  );

  for (const result of curated) {
    if (result.status === 'fulfilled') push(result.value);
  }

  return merged.slice(0, SEARCH_RESULT_LIMIT);
}

async function searchByAliasApps(
  query: string,
  lang: string,
  country: string,
): Promise<SearchAppResult[]> {
  const appIds = resolveSearchAliasAppIds(query);
  if (!appIds?.length) return [];

  const blocked = new Set<string>();
  const merged: SearchAppResult[] = [];

  const push = (item: SearchAppResult) => {
    if (!item.appId || blocked.has(item.appId) || isUnsupportedNoMirrorApp(item.appId)) return;
    blocked.add(item.appId);
    merged.push(item);
  };

  const curated = await Promise.allSettled(
    appIds.map((appId) => fetchExactApp(appId, lang, country)),
  );

  for (const result of curated) {
    if (result.status === 'fulfilled') push(result.value);
  }

  return merged.slice(0, SEARCH_RESULT_LIMIT);
}

async function searchApps(term: string, lang: string, country: string): Promise<SearchAppResult[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gplayAny = gplay as any;

  // Try primary search first
  try {
    const apps: IAppItem[] = await withTimeout(
      gplay.search({
        term,
        num: SEARCH_RESULT_LIMIT,
        lang,
        country,
        price: 'all',
        requestOptions,
      } as Parameters<typeof gplay.search>[0] & { requestOptions?: typeof requestOptions }),
      SEARCH_TIMEOUT_MS,
      'Network timeout: Cannot search Google Play'
    );

    if (apps.length > 0) {
      const seen = new Set<string>();
      return apps
        .filter((app) => {
          if (!app.appId || seen.has(app.appId)) return false;
          seen.add(app.appId);
          return true;
        })
        .map(toSearchResult);
    }
  } catch (e) {
    console.error('[API search-apps] search() failed:', e instanceof Error ? e.message : e);
  }

  // Fallback 1: try suggest() to get appIds, then app() to get details
  console.error('[API search-apps] search returned no results, trying suggest fallback');
  try {
    const suggestions: Array<{ appId?: string }> = await withTimeout(
      gplayAny.suggest({ term, lang, country, requestOptions }),
      SEARCH_TIMEOUT_MS,
      'Suggest timeout'
    );

    const appIds = suggestions
      .map(s => s.appId || '')
      .filter(Boolean)
      .slice(0, SEARCH_RESULT_LIMIT);

    if (appIds.length > 0) {
      const results = await Promise.allSettled(
        appIds.map((appId: string) => fetchExactApp(appId, lang, country))
      );

      const suggestResults = results
        .filter((r) => r.status === 'fulfilled')
        .map((r) => (r as PromiseFulfilledResult<SearchAppResult>).value);

      if (suggestResults.length > 0) return suggestResults;
    }
  } catch (e) {
    console.error('[API search-apps] suggest fallback also failed:', e instanceof Error ? e.message : e);
  }

  // Fallback 2: try list() to find top apps, then filter by term
  console.error('[API search-apps] suggest also failed, trying list() fallback');
  try {
    const listResults: IAppItem[] = await withTimeout(
      gplayAny.list({
        collection: gplayAny.collection.TOP_FREE,
        category: gplayAny.category.APPLICATION,
        num: 50,
        lang,
        country,
        requestOptions,
      }),
      SEARCH_TIMEOUT_MS,
      'List timeout'
    );

    const termLower = term.toLowerCase();
    const matched = listResults.filter(
      (app: IAppItem) =>
        (app.appId && app.title?.toLowerCase().includes(termLower)) ||
        app.developer?.toLowerCase().includes(termLower)
    ).slice(0, SEARCH_RESULT_LIMIT);

    if (matched.length > 0) {
      return matched.map(toSearchResult);
    }
  } catch (e) {
    console.error('[API search-apps] list() fallback failed:', e instanceof Error ? e.message : e);
  }

  // Fallback 3: try direct fetch to Google Play search page and scrape
  console.error('[API search-apps] all fallbacks failed, trying direct HTTP scrape');
  try {
    const searchUrl = `https://play.google.com/store/search?q=${encodeURIComponent(term)}&c=apps&hl=${lang}&gl=${country}`;
    const resp = await fetch(searchUrl, {
      signal: AbortSignal.timeout(15000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; gptoapk/1.0)' },
    });

    if (resp.ok) {
      const html = await resp.text();
      // Try to extract app IDs from the search page HTML
      const appIdMatches = html.match(/data-docid="([^"]+)"/g) || [];
      const appIds = [...new Set(
        appIdMatches.map(m => m.replace('data-docid="', '').replace('"', ''))
      )].slice(0, SEARCH_RESULT_LIMIT);

      if (appIds.length > 0) {
        const results = await Promise.allSettled(
          appIds.map((appId: string) => fetchExactApp(appId, lang, country))
        );

        const scrapeResults = results
          .filter((r) => r.status === 'fulfilled')
          .map((r) => (r as PromiseFulfilledResult<SearchAppResult>).value);

        if (scrapeResults.length > 0) return scrapeResults;
      }
    }
  } catch (e) {
    console.error('[API search-apps] direct scrape fallback also failed:', e instanceof Error ? e.message : e);
  }

  return [];
}

function searchSuccessResponse(
  query: string,
  queryType: QueryType,
  lang: string,
  country: string,
  results: SearchAppResult[],
) {
  void recordSearchSuccess(query, queryType);
  return NextResponse.json(
    {
      query,
      queryType,
      lang,
      country,
      results,
    },
    { headers: SUCCESS_CACHE_HEADERS },
  );
}

function searchFailureResponse(
  query: string,
  queryType: QueryType,
  failureKind: SearchFailureKind,
  error: string,
  status: number,
  lang?: string,
  country?: string,
) {
  void recordSearchFailure({
    query,
    queryType,
    failureKind,
    lastError: error,
    lang,
    country,
  });
  return NextResponse.json({ error }, { status });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawQuery = searchParams.get('q')?.trim() ?? '';
  const requestedLang = normalizeLocale(searchParams.get('hl'), 'en');
  const requestedCountry = normalizeCountry(searchParams.get('gl'), 'us');

  if (!rawQuery) {
    return searchFailureResponse('', 'keyword', 'search_error', 'Missing search query', 400, requestedLang, requestedCountry);
  }

  if (/^file:\/\//i.test(rawQuery)) {
    return searchFailureResponse(
      rawQuery,
      'keyword',
      'invalid_url',
      'Local file paths cannot be searched. Enter an app name, package name, or Google Play link.',
      400,
      requestedLang,
      requestedCountry,
    );
  }

  const query = normalizeUserSearchQuery(rawQuery);
  const queryType = getQueryType(query);

  if (query.length > MAX_QUERY_LENGTH) {
    return searchFailureResponse(query, queryType, 'query_too_long', 'Search query is too long', 400, requestedLang, requestedCountry);
  }

  try {
    if (queryType === 'keyword' && isVpnKeyword(query)) {
      const results = await searchDownloadableVpnApps(requestedLang, requestedCountry);
      if (results.length === 0) {
        return searchFailureResponse(query, queryType, 'no_results', 'No apps found', 404, requestedLang, requestedCountry);
      }
      return searchSuccessResponse(query, queryType, requestedLang, requestedCountry, results);
    }

    if (queryType === 'url') {
      const parsed = parseGooglePlayUrl(query);
      if (!parsed) {
        return searchFailureResponse(query, queryType, 'invalid_url', 'Invalid Google Play URL', 400, requestedLang, requestedCountry);
      }

      const result = await fetchExactApp(parsed.appId, parsed.lang, parsed.country);
      return searchSuccessResponse(query, queryType, parsed.lang, parsed.country, [result]);
    }

    if (queryType === 'package') {
      const result = await fetchExactApp(query, requestedLang, requestedCountry);
      return searchSuccessResponse(query, queryType, requestedLang, requestedCountry, [result]);
    }

    let results = await searchByAliasApps(query, requestedLang, requestedCountry);
    if (results.length === 0) {
      results = await searchApps(query, requestedLang, requestedCountry);
    }
    results = results.filter((app) => !isUnsupportedNoMirrorApp(app.appId));
    if (results.length === 0) {
      return searchFailureResponse(query, queryType, 'no_results', 'No apps found', 404, requestedLang, requestedCountry);
    }

    return searchSuccessResponse(query, queryType, requestedLang, requestedCountry, results);
  } catch (error) {
    console.error('[API search-apps] ERROR:', error instanceof Error ? error.message : error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    const failureKind: SearchFailureKind = queryType === 'url' ? 'invalid_url' : 'search_error';
    const clientError = queryType === 'keyword' ? `No apps found: ${errorMsg}` : 'App not found or invalid Google Play URL';
    return searchFailureResponse(query, queryType, failureKind, clientError, 404, requestedLang, requestedCountry);
  }
}
