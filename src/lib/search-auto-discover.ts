import gplay, { type IAppItem } from "google-play-scraper";
import { initDatabase, resolveSearchFailuresForQuery } from "@/lib/db";
import { normalizeUserSearchQuery } from "@/lib/normalize-user-search-query";
import { gplayRequestOptions as requestOptions } from "@/lib/proxy";
import { resolvePlayPackageIdAlias } from "@/lib/search-aliases";
import { saveSearchAliasOverrideForQuery } from "@/lib/search-alias-overrides";
import {
  applySearchTypoCorrection,
  isVpnSearchKeyword,
  stripInvisibleSearchChars,
  stripSearchQueryNoise,
} from "@/lib/search-query-normalize";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import { expandSearchQueryVariants } from "@/lib/search-query-variants";

const SEARCH_TIMEOUT_MS = 12_000;
const STRICT_MIN_SCORE = 4;
const AUTO_DISCOVER_MIN_QUERY_LEN = 2;
const AUTO_DISCOVER_MAX_QUERY_LEN = 80;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

function pickRelevantAppIds(term: string, apps: IAppItem[], strict: boolean): string[] {
  const normalizedTerm = stripSearchQueryNoise(term) || term.trim().toLowerCase();
  const tokens = normalizedTerm.split(/\s+/).filter((t) => t.length >= 2);

  const scored = apps
    .filter((app) => app.appId && !isUnsupportedNoMirrorApp(app.appId))
    .map((app) => {
      const haystack = `${app.title || ""} ${app.developer || ""} ${app.appId}`.toLowerCase();
      let score = 0;
      if (haystack.includes(normalizedTerm)) score += 10;
      for (const token of tokens) {
        if (haystack.includes(token)) score += 2;
      }
      if (app.appId.toLowerCase().includes(normalizedTerm.replace(/\s+/g, ""))) score += 4;
      return { appId: app.appId, score };
    })
    .sort((a, b) => b.score - a.score);

  const minScore = strict ? STRICT_MIN_SCORE : 2;
  const top = scored.filter((item) => item.score >= minScore).slice(0, 3);
  if (top.length) return top.map((item) => item.appId);

  if (!strict && scored.length > 0 && scored[0]!.score > 0) {
    return [scored[0]!.appId];
  }

  return [];
}

export async function searchPlayStoreAppIds(
  term: string,
  lang: string,
  country: string,
  options?: { strict?: boolean },
): Promise<string[]> {
  const strict = options?.strict ?? true;
  const gplayAny = gplay as typeof gplay & {
    suggest: (opts: Record<string, unknown>) => Promise<Array<{ appId?: string }>>;
  };

  try {
    const apps = await withTimeout(
      gplay.search({
        term,
        num: 8,
        lang,
        country,
        price: "all",
        requestOptions,
      } as Parameters<typeof gplay.search>[0] & { requestOptions?: typeof requestOptions }),
      SEARCH_TIMEOUT_MS,
      "Google Play search timeout",
    );
    if (apps.length) {
      const picked = pickRelevantAppIds(term, apps, strict);
      if (picked.length) return picked;
    }
  } catch {
    // fall through to suggest
  }

  try {
    const suggestions = await withTimeout(
      gplayAny.suggest({ term, lang, country, requestOptions }),
      SEARCH_TIMEOUT_MS,
      "Google Play suggest timeout",
    );
    const appIds = suggestions.map((s) => s.appId || "").filter(Boolean).slice(0, 5);
    if (appIds.length) {
      return appIds
        .map((id) => resolvePlayPackageIdAlias(id))
        .filter((id) => id && !isUnsupportedNoMirrorApp(id));
    }
  } catch {
    // no results
  }

  return [];
}

function localeFallbacks(lang: string, country: string): Array<{ lang: string; country: string }> {
  const seen = new Set<string>();
  const out: Array<{ lang: string; country: string }> = [];
  const add = (l: string, c: string) => {
    const key = `${l}:${c}`;
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ lang: l, country: c });
  };

  add(lang, country);
  add("en", "us");
  if (lang.startsWith("zh")) {
    add("zh", "cn");
    add("zh", "hk");
    add("zh", "tw");
  } else if (lang.startsWith("en")) {
    add("zh", "hk");
  }

  return out;
}

function extraQueryVariants(rawQuery: string): string[] {
  const trimmed = stripInvisibleSearchChars(rawQuery).trim();
  const variants = expandSearchQueryVariants(trimmed);
  const seen = new Set(variants.map((v) => v.toLowerCase()));

  const add = (value: string) => {
    const key = value.trim();
    if (!key || seen.has(key.toLowerCase())) return;
    seen.add(key.toLowerCase());
    variants.push(key);
  };

  if (/^[A-Z0-9]{3,12}$/.test(trimmed)) {
    add(trimmed.toLowerCase());
    add(trimmed.charAt(0) + trimmed.slice(1).toLowerCase());
  }

  const corrected = applySearchTypoCorrection(trimmed);
  add(corrected);
  add(stripSearchQueryNoise(corrected));

  return variants;
}

export type DiscoverAppIdsOptions = {
  strict?: boolean;
  persistAlias?: boolean;
  sourceLabel?: string;
};

/**
 * Query Google Play (multi-locale + query variants) and optionally persist a learned alias.
 */
export async function discoverAppIdsFromPlayStore(
  rawQuery: string,
  lang: string,
  country: string,
  options?: DiscoverAppIdsOptions,
): Promise<string[] | null> {
  const trimmed = stripInvisibleSearchChars(rawQuery).trim();
  const query = normalizeUserSearchQuery(trimmed);
  if (!query || query.length < AUTO_DISCOVER_MIN_QUERY_LEN || query.length > AUTO_DISCOVER_MAX_QUERY_LEN) {
    return null;
  }
  if (isVpnSearchKeyword(query)) return null;

  const strict = options?.strict ?? true;
  const variants = extraQueryVariants(trimmed);

  for (const { lang: tryLang, country: tryCountry } of localeFallbacks(lang, country)) {
    for (const term of variants) {
      const appIds = await searchPlayStoreAppIds(term, tryLang, tryCountry, { strict });
      if (!appIds.length) continue;

      if (options?.persistAlias !== false) {
        try {
          await initDatabase();
          await saveSearchAliasOverrideForQuery({
            query: trimmed,
            appIds,
            sourceQuery: term,
            sourceLabel: options?.sourceLabel ?? "inline-search-discovery",
          });
          await resolveSearchFailuresForQuery(trimmed);
        } catch (error) {
          console.warn(
            "[search-auto-discover] persist alias failed:",
            error instanceof Error ? error.message : error,
          );
        }
      }

      return appIds;
    }
  }

  return null;
}

/** Called inline from /api/search-apps before returning 404. */
export async function tryInlineSearchDiscovery(
  rawQuery: string,
  lang: string,
  country: string,
): Promise<string[] | null> {
  return discoverAppIdsFromPlayStore(rawQuery, lang, country, {
    strict: false,
    persistAlias: true,
    sourceLabel: "inline-search-discovery",
  });
}

/** Fire-and-forget: learn alias after a logged search failure for the next visitor. */
export function scheduleSearchFailureAutoDiscovery(params: {
  query: string;
  lang?: string;
  country?: string;
}): void {
  const trimmed = params.query.trim();
  if (!trimmed || trimmed.length < AUTO_DISCOVER_MIN_QUERY_LEN) return;

  const lang = (params.lang || "en").slice(0, 8);
  const country = (params.country || (lang.startsWith("zh") ? "cn" : "us")).slice(0, 8);

  void discoverAppIdsFromPlayStore(trimmed, lang, country, {
    strict: false,
    persistAlias: true,
    sourceLabel: "search-failure-auto-discovery",
  }).catch((error) => {
    console.warn(
      "[search-auto-discover] background discovery failed:",
      error instanceof Error ? error.message : error,
    );
  });
}
