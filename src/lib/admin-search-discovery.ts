import gplay, { type IAppItem } from "google-play-scraper";
import { normalizeUserSearchQuery } from "@/lib/normalize-user-search-query";
import { gplayRequestOptions as requestOptions } from "@/lib/proxy";
import { resolvePlayPackageIdAlias, resolveSearchAliasAppIds, PRIORITY_STATIC_ALIAS_QUERIES, listStaticSearchAliasBindings } from "@/lib/search-aliases";
import { isVpnSearchKeyword, stripSearchQueryNoise, applySearchTypoCorrection, extractPlayStorePackageId, stripInvisibleSearchChars } from "@/lib/search-query-normalize";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import {
  getPendingMissingAppFeedbacks,
  getUnresolvedSearchFailuresForDiscovery,
  initDatabase,
  reconcileResolvableSearchFailures,
  resolveSearchFailuresForQuery,
  updateMissingAppFeedbackStatus,
} from "@/lib/db";
import {
  resolveSearchAliasOverrideAppIds,
  saveSearchAliasOverrideForQuery,
} from "@/lib/search-alias-overrides";
import { expandSearchQueryVariants } from "@/lib/search-query-variants";
import { canResolveSearchQueryNow, canResolveSearchQueryNowAsync } from "@/lib/search-failure-reconcile";

const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;
const SEARCH_TIMEOUT_MS = 22_000;

type QueryType = "url" | "package" | "keyword";

export type SearchDiscoveryReport = {
  feedbackProcessed: number;
  feedbackResolved: number;
  aliasesCreated: number;
  searchFailuresResolved: number;
  discoveryAttempts: number;
  discoveryMisses: number;
};

function getQueryType(query: string): QueryType {
  const trimmed = stripInvisibleSearchChars(query).trim();
  if (extractPlayStorePackageId(trimmed)) return "url";
  if (trimmed.includes("play.google.com")) return "url";
  if (PACKAGE_NAME_REGEX.test(trimmed)) return "package";
  return "keyword";
}

function parseGooglePlayUrl(query: string) {
  const appId = extractPlayStorePackageId(query);
  if (!appId) return null;
  return { appId: resolvePlayPackageIdAlias(appId) };
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(message)), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

function pickRelevantApps(term: string, apps: IAppItem[]): string[] {
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

  const top = scored.filter((item) => item.score > 0).slice(0, 3);
  if (top.length) return top.map((item) => item.appId);

  return apps
    .filter((app) => app.appId && !isUnsupportedNoMirrorApp(app.appId))
    .slice(0, 1)
    .map((app) => app.appId);
}

async function searchGooglePlay(term: string, lang: string, country: string): Promise<string[]> {
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
    if (apps.length) return pickRelevantApps(term, apps);
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

export async function discoverAppIdsForQuery(
  rawQuery: string,
  lang: string,
  country: string,
): Promise<string[] | null> {
  for (const query of expandSearchQueryVariants(rawQuery)) {
    const result = await discoverAppIdsForNormalizedQuery(query, lang, country);
    if (result?.length) return result;
  }
  return null;
}

async function discoverAppIdsForNormalizedQuery(
  rawQuery: string,
  lang: string,
  country: string,
): Promise<string[] | null> {
  const query = normalizeUserSearchQuery(rawQuery.trim());
  if (!query) return null;

  if (isVpnSearchKeyword(query)) return null;

  const existing = await resolveSearchAliasOverrideAppIds(query);
  if (existing?.length) return existing;
  if (canResolveSearchQueryNow(query)) {
    const staticIds = resolveSearchAliasAppIds(query);
    if (staticIds?.length) return [...staticIds];
  }

  const viaApi = await discoverViaSearchAppsApi(query, lang, country);
  if (viaApi?.length) return viaApi;

  const stripped = stripSearchQueryNoise(query);
  if (stripped && stripped !== query.trim().toLowerCase()) {
    const viaStripped = await discoverViaSearchAppsApi(stripped, lang, country);
    if (viaStripped?.length) return viaStripped;
  }

  const queryType = getQueryType(query);

  if (queryType === "package") {
    const appId = resolvePlayPackageIdAlias(query);
    if (isUnsupportedNoMirrorApp(appId)) return null;
    return [appId];
  }

  if (queryType === "url") {
    const parsed = parseGooglePlayUrl(query);
    if (!parsed || isUnsupportedNoMirrorApp(parsed.appId)) return null;
    return [parsed.appId];
  }

  let appIds = await searchGooglePlay(query, lang, country);
  if (!appIds.length) {
    const stripped = stripSearchQueryNoise(query);
    if (stripped && stripped !== query.trim().toLowerCase()) {
      appIds = await searchGooglePlay(stripped, lang, country);
    }
  }

  return appIds.length ? appIds : null;
}

function repairSiteOrigin(): string {
  const host =
    process.env.REPAIR_SITE_HOST ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.gptoapk.com";
  return host.replace(/\/$/, "");
}

async function discoverViaSearchAppsApi(
  query: string,
  lang: string,
  country: string,
): Promise<string[] | null> {
  const params = new URLSearchParams({ q: query, hl: lang, gl: country });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const res = await fetch(`${repairSiteOrigin()}/api/search-apps?${params}`, {
      signal: controller.signal,
      cache: "no-store",
      headers: { "User-Agent": "gptoapk-search-discovery/1.0" },
    });
    const data = (await res.json().catch(() => ({}))) as { results?: Array<{ appId?: string }> };
    const appIds = (data.results || [])
      .map((item) => item.appId?.trim())
      .filter((id): id is string => Boolean(id && !isUnsupportedNoMirrorApp(id)));
    return appIds.length ? [...new Set(appIds)] : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function applyDiscoveryForQuery(params: {
  query: string;
  lang: string;
  country: string;
  sourceLabel: string;
}): Promise<{ resolved: boolean; aliasesCreated: number; searchFailuresResolved: number }> {
  for (const variant of expandSearchQueryVariants(params.query)) {
    const result = await applyDiscoveryForQueryVariant({ ...params, query: variant, originalQuery: params.query });
    if (result.resolved) return result;
  }
  return { resolved: false, aliasesCreated: 0, searchFailuresResolved: 0 };
}

async function applyDiscoveryForQueryVariant(params: {
  query: string;
  originalQuery: string;
  lang: string;
  country: string;
  sourceLabel: string;
}): Promise<{ resolved: boolean; aliasesCreated: number; searchFailuresResolved: number }> {
  const normalizedQuery = applySearchTypoCorrection(params.query.trim());
  const stripped = stripSearchQueryNoise(normalizedQuery);
  const queryForLookup = stripped.length >= 2 ? stripped : normalizedQuery;
  const staticIds = resolveSearchAliasAppIds(queryForLookup);
  if (staticIds?.length) {
    const aliasesCreated = await saveSearchAliasOverrideForQuery({
      query: params.originalQuery,
      appIds: [...staticIds],
      sourceQuery: normalizedQuery,
      sourceLabel: `${params.sourceLabel}-static`,
    });
    const searchFailuresResolved = await resolveSearchFailuresForQuery(params.originalQuery);
    return { resolved: true, aliasesCreated, searchFailuresResolved };
  }

  const appIds = await discoverAppIdsForNormalizedQuery(normalizedQuery, params.lang, params.country);
  if (!appIds?.length) {
    return { resolved: false, aliasesCreated: 0, searchFailuresResolved: 0 };
  }

  const aliasesCreated = await saveSearchAliasOverrideForQuery({
    query: params.originalQuery,
    appIds,
    sourceQuery: params.query,
    sourceLabel: params.sourceLabel,
  });

  const searchFailuresResolved = await resolveSearchFailuresForQuery(params.originalQuery);
  return { resolved: true, aliasesCreated, searchFailuresResolved };
}

export async function tryResolveMissingAppFeedbackById(params: {
  id: number;
  query: string;
  locale?: string;
  country?: string;
}): Promise<{ resolved: boolean; aliasesCreated: number }> {
  await initDatabase();
  const lang = params.locale || "en";
  const country = params.country || (lang.startsWith("zh") ? "cn" : "us");
  const result = await applyDiscoveryForQuery({
    query: params.query,
    lang,
    country,
    sourceLabel: "missing-app-feedback-immediate",
  });
  if (result.resolved) {
    await updateMissingAppFeedbackStatus(params.id, "done");
  }
  return { resolved: result.resolved, aliasesCreated: result.aliasesCreated };
}

export async function repairMissingAppFeedback(options?: {
  limit?: number;
}): Promise<Pick<SearchDiscoveryReport, "feedbackProcessed" | "feedbackResolved" | "aliasesCreated" | "searchFailuresResolved" | "discoveryAttempts" | "discoveryMisses">> {
  const limit = Math.min(Math.max(options?.limit ?? 40, 1), 100);
  await initDatabase();

  const { rows } = await getPendingMissingAppFeedbacks(limit, 0);
  let feedbackResolved = 0;
  let aliasesCreated = 0;
  let searchFailuresResolved = 0;
  let discoveryAttempts = 0;
  let discoveryMisses = 0;

  for (const item of rows) {
    discoveryAttempts += 1;
    const lang = item.locale || "en";
    const country = item.country || (lang.startsWith("zh") ? "cn" : "us");
    const result = await applyDiscoveryForQuery({
      query: item.query,
      lang,
      country,
      sourceLabel: "missing-app-feedback",
    });

    if (result.resolved) {
      feedbackResolved += 1;
      aliasesCreated += result.aliasesCreated;
      searchFailuresResolved += result.searchFailuresResolved;
      await updateMissingAppFeedbackStatus(item.id, "done");
    } else {
      discoveryMisses += 1;
    }
  }

  return {
    feedbackProcessed: rows.length,
    feedbackResolved,
    aliasesCreated,
    searchFailuresResolved,
    discoveryAttempts,
    discoveryMisses,
  };
}

export async function repairSearchFailuresViaDiscovery(options?: {
  limit?: number;
}): Promise<Pick<SearchDiscoveryReport, "aliasesCreated" | "searchFailuresResolved" | "discoveryAttempts" | "discoveryMisses">> {
  const limit = Math.min(Math.max(options?.limit ?? 120, 1), 200);
  await initDatabase();

  const rows = await getUnresolvedSearchFailuresForDiscovery(limit);
  let aliasesCreated = 0;
  let searchFailuresResolved = 0;
  let discoveryAttempts = 0;
  let discoveryMisses = 0;

  for (const row of rows) {
    if (canResolveSearchQueryNow(row.query) || (await canResolveSearchQueryNowAsync(row.query))) {
      const count = await resolveSearchFailuresForQuery(row.query);
      if (count > 0) searchFailuresResolved += count;
      continue;
    }

    const override = await resolveSearchAliasOverrideAppIds(row.query);
    if (override?.length) {
      const count = await resolveSearchFailuresForQuery(row.query);
      if (count > 0) searchFailuresResolved += count;
      continue;
    }

    discoveryAttempts += 1;
    const lang = row.last_lang || "en";
    const country = row.last_country || (lang.startsWith("zh") ? "cn" : "us");
    const result = await applyDiscoveryForQuery({
      query: row.query,
      lang,
      country,
      sourceLabel: "search-failure-discovery",
    });

    if (result.resolved) {
      aliasesCreated += result.aliasesCreated;
      searchFailuresResolved += result.searchFailuresResolved;
    } else {
      discoveryMisses += 1;
    }
  }

  return { aliasesCreated, searchFailuresResolved, discoveryAttempts, discoveryMisses };
}

/** Overwrite DB overrides for curated aliases so bad auto-discovery mappings cannot win. */
export async function syncPriorityStaticSearchAliasOverrides(): Promise<number> {
  await initDatabase();
  let synced = 0;

  for (const query of PRIORITY_STATIC_ALIAS_QUERIES) {
    for (const variant of expandSearchQueryVariants(query)) {
      const staticIds = resolveSearchAliasAppIds(applySearchTypoCorrection(variant));
      if (!staticIds?.length) continue;

      synced += await saveSearchAliasOverrideForQuery({
        query: variant,
        appIds: [...staticIds],
        sourceQuery: applySearchTypoCorrection(variant),
        sourceLabel: "static-alias-priority-sync",
      });
      break;
    }
  }

  return synced;
}

/** Overwrite all curated static alias keys in DB (fixes bad auto-learned overrides). */
export async function syncAllStaticSearchAliasOverrides(): Promise<number> {
  await initDatabase();
  let synced = 0;

  for (const binding of listStaticSearchAliasBindings()) {
    synced += await saveSearchAliasOverrideForQuery({
      query: binding.alias,
      appIds: [...binding.appIds],
      sourceQuery: binding.alias,
      sourceLabel: "static-alias-full-sync",
    });
  }

  return synced;
}

export async function reconcileStaticAliasSearchFailures(maxRows = 2000): Promise<number> {
  await initDatabase();
  let resolved = 0;
  let offset = 0;
  const batchSize = 200;
  const cap = Math.min(Math.max(maxRows, batchSize), 5000);

  while (offset < cap) {
    const rows = await getUnresolvedSearchFailuresForDiscovery(
      Math.min(batchSize, cap - offset),
      offset,
    );
    if (!rows.length) break;

    for (const row of rows) {
      for (const variant of expandSearchQueryVariants(row.query)) {
        const corrected = applySearchTypoCorrection(variant);
        const staticIds = resolveSearchAliasAppIds(corrected);
        if (!staticIds?.length) continue;

        await saveSearchAliasOverrideForQuery({
          query: row.query,
          appIds: [...staticIds],
          sourceQuery: corrected,
          sourceLabel: "static-alias-reconcile",
        });
        resolved += await resolveSearchFailuresForQuery(row.query);
        break;
      }
    }

    offset += rows.length;
    if (rows.length < batchSize) break;
  }

  return resolved;
}

export async function runSearchDiscoveryRepair(options?: {
  feedbackLimit?: number;
  searchFailureLimit?: number;
  reconcileMaxChecks?: number;
  reconcileLiveProbeLimit?: number;
}): Promise<SearchDiscoveryReport & { reconcile: Awaited<ReturnType<typeof reconcileResolvableSearchFailures>> }> {
  await syncPriorityStaticSearchAliasOverrides();
  await syncAllStaticSearchAliasOverrides();
  const staticResolved = await reconcileStaticAliasSearchFailures(3000);
  const feedback = await repairMissingAppFeedback({ limit: options?.feedbackLimit });
  const discovery = await repairSearchFailuresViaDiscovery({ limit: options?.searchFailureLimit });
  const reconcile = await reconcileResolvableSearchFailures({
    batchSize: 500,
    maxChecks: options?.reconcileMaxChecks ?? 5000,
    liveProbeLimit: options?.reconcileLiveProbeLimit ?? 120,
  });

  return {
    feedbackProcessed: feedback.feedbackProcessed,
    feedbackResolved: feedback.feedbackResolved,
    aliasesCreated: feedback.aliasesCreated + discovery.aliasesCreated,
    searchFailuresResolved:
      staticResolved +
      feedback.searchFailuresResolved +
      discovery.searchFailuresResolved +
      reconcile.resolved +
      reconcile.liveResolved,
    discoveryAttempts: feedback.discoveryAttempts + discovery.discoveryAttempts,
    discoveryMisses: feedback.discoveryMisses + discovery.discoveryMisses,
    reconcile,
  };
}
