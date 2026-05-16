import { NextResponse } from 'next/server';
import gplay, { type IAppItem, type IAppItemFullDetail } from 'google-play-scraper';
import { gplayRequestOptions as requestOptions } from '@/lib/proxy';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SEARCH_TIMEOUT_MS = 10000;
const EXACT_TIMEOUT_MS = 8000;
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
    icon: app.icon || null,
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
  const appInfo = await withTimeout(
    gplay.app({ appId, lang, country, requestOptions } as Parameters<typeof gplay.app>[0]),
    EXACT_TIMEOUT_MS,
    'Network timeout: Cannot connect to Google Play'
  );

  return toSearchResult(appInfo);
}

async function searchApps(term: string, lang: string, country: string) {
  const apps = await withTimeout(
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

  const seen = new Set<string>();
  return apps
    .filter((app) => {
      if (!app.appId || seen.has(app.appId)) return false;
      seen.add(app.appId);
      return true;
    })
    .map(toSearchResult);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim() ?? '';

  if (!query) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 });
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: 'Search query is too long' }, { status: 400 });
  }

  const requestedLang = normalizeLocale(searchParams.get('hl'), 'en');
  const requestedCountry = normalizeCountry(searchParams.get('gl'), 'us');
  const queryType = getQueryType(query);

  try {
    if (queryType === 'url') {
      const parsed = parseGooglePlayUrl(query);
      if (!parsed) {
        return NextResponse.json({ error: 'Invalid Google Play URL' }, { status: 400 });
      }

      const result = await fetchExactApp(parsed.appId, parsed.lang, parsed.country);
      return NextResponse.json({
        query,
        queryType,
        lang: parsed.lang,
        country: parsed.country,
        results: [result],
      }, { headers: SUCCESS_CACHE_HEADERS });
    }

    if (queryType === 'package') {
      const result = await fetchExactApp(query, requestedLang, requestedCountry);
      return NextResponse.json({
        query,
        queryType,
        lang: requestedLang,
        country: requestedCountry,
        results: [result],
      }, { headers: SUCCESS_CACHE_HEADERS });
    }

    const results = await searchApps(query, requestedLang, requestedCountry);
    if (results.length === 0) {
      return NextResponse.json({ error: 'No apps found' }, { status: 404 });
    }

    return NextResponse.json({
      query,
      queryType,
      lang: requestedLang,
      country: requestedCountry,
      results,
    }, { headers: SUCCESS_CACHE_HEADERS });
  } catch (error) {
    console.error('[API search-apps] ERROR:', error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: queryType === 'keyword' ? 'No apps found' : 'App not found or invalid Google Play URL' },
      { status: 404 }
    );
  }
}
