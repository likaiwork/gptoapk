import { normalizeUserSearchQuery } from "@/lib/normalize-user-search-query";
import { resolvePlayPackageIdAlias, resolveSearchAliasAppIds, PRIORITY_STATIC_ALIAS_QUERIES, listStaticSearchAliasBindings } from "@/lib/search-aliases";
import { discoverAppIdsFromPlayStore } from "@/lib/search-auto-discover";
import { isVpnSearchKeyword, stripSearchQueryNoise, applySearchTypoCorrection, extractPlayStorePackageId, stripInvisibleSearchChars } from "@/lib/search-query-normalize";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";
import {
  getPendingMissingAppFeedbacks,
  getUnresolvedSearchFailuresForDiscovery,
  initDatabase,
  reconcileResolvableSearchFailures,
  resolveSearchFailureByQueryKey,
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

function isUnresolvableMissingAppQuery(query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  return (
    q.includes("badugi") ||
    q.includes("poker master") ||
    q.includes("pokermaster") ||
    q === "ph"
  );
}

async function markSearchFailuresResolvedForQuery(query: string, queryKey?: string): Promise<number> {
  let resolved = await resolveSearchFailuresForQuery(query);
  if (resolved === 0 && queryKey) {
    const byKey = await resolveSearchFailureByQueryKey(queryKey);
    if (byKey) resolved = 1;
  }
  return resolved;
}

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

export async function discoverAppIdsForQuery(
  rawQuery: string,
  lang: string,
  country: string,
): Promise<string[] | null> {
  for (const query of expandSearchQueryVariants(rawQuery)) {
    const result = await discoverAppIdsForNormalizedQuery(query, lang, country, "admin-discovery");
    if (result?.length) return result;
  }
  return null;
}

async function discoverAppIdsForNormalizedQuery(
  rawQuery: string,
  lang: string,
  country: string,
  sourceLabel = "admin-discovery",
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

  return discoverAppIdsFromPlayStore(rawQuery, lang, country, {
    strict: false,
    persistAlias: true,
    sourceLabel,
  });
}

async function applyDiscoveryForQuery(params: {
  query: string;
  queryKey?: string;
  lang: string;
  country: string;
  sourceLabel: string;
}): Promise<{ resolved: boolean; aliasesCreated: number; searchFailuresResolved: number }> {
  for (const variant of expandSearchQueryVariants(params.query)) {
    const result = await applyDiscoveryForQueryVariant({
      ...params,
      query: variant,
      originalQuery: params.query,
      queryKey: params.queryKey,
    });
    if (result.resolved) return result;
  }
  return { resolved: false, aliasesCreated: 0, searchFailuresResolved: 0 };
}

async function applyDiscoveryForQueryVariant(params: {
  query: string;
  originalQuery: string;
  queryKey?: string;
  lang: string;
  country: string;
  sourceLabel: string;
}): Promise<{ resolved: boolean; aliasesCreated: number; searchFailuresResolved: number }> {
  const normalizedQuery = applySearchTypoCorrection(params.query.trim());
  const stripped = stripSearchQueryNoise(normalizedQuery);
  const queryForLookup = stripped.length >= 2 ? stripped : normalizedQuery;
  if (isVpnSearchKeyword(queryForLookup) || isVpnSearchKeyword(normalizedQuery)) {
    const searchFailuresResolved = await markSearchFailuresResolvedForQuery(
      params.originalQuery,
      params.queryKey,
    );
    return { resolved: true, aliasesCreated: 0, searchFailuresResolved };
  }

  const staticIds = resolveSearchAliasAppIds(queryForLookup);
  if (staticIds?.length) {
    const aliasesCreated = await saveSearchAliasOverrideForQuery({
      query: params.originalQuery,
      appIds: [...staticIds],
      sourceQuery: normalizedQuery,
      sourceLabel: `${params.sourceLabel}-static`,
    });
    const searchFailuresResolved = await markSearchFailuresResolvedForQuery(
      params.originalQuery,
      params.queryKey,
    );
    return { resolved: true, aliasesCreated, searchFailuresResolved };
  }

  const appIds = await discoverAppIdsForNormalizedQuery(
    normalizedQuery,
    params.lang,
    params.country,
    params.sourceLabel,
  );
  if (!appIds?.length) {
    return { resolved: false, aliasesCreated: 0, searchFailuresResolved: 0 };
  }

  const aliasesCreated = await saveSearchAliasOverrideForQuery({
    query: params.originalQuery,
    appIds,
    sourceQuery: params.query,
    sourceLabel: params.sourceLabel,
  });

  const searchFailuresResolved = await markSearchFailuresResolvedForQuery(
    params.originalQuery,
    params.queryKey,
  );
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
    } else if (
      isUnresolvableMissingAppQuery(item.query) ||
      (await canResolveSearchQueryNowAsync(item.query))
    ) {
      searchFailuresResolved += await markSearchFailuresResolvedForQuery(item.query);
      feedbackResolved += 1;
      await updateMissingAppFeedbackStatus(item.id, "done");
    } else {
      discoveryMisses += 1;
      // 保持 pending，便于后台继续重试并在管理面板可见
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
      searchFailuresResolved += await markSearchFailuresResolvedForQuery(row.query, row.query_key);
      continue;
    }

    const override = await resolveSearchAliasOverrideAppIds(row.query);
    if (override?.length) {
      searchFailuresResolved += await markSearchFailuresResolvedForQuery(row.query, row.query_key);
      continue;
    }

    discoveryAttempts += 1;
    const lang = row.last_lang || "en";
    const country = row.last_country || (lang.startsWith("zh") ? "cn" : "us");
    const result = await applyDiscoveryForQuery({
      query: row.query,
      queryKey: row.query_key,
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
        resolved += await markSearchFailuresResolvedForQuery(row.query, row.query_key);
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
  reconcileLiveProbeTimeoutMs?: number;
  /** Skip expensive static-alias DB sync (use on batched reconcile rounds after the first). */
  skipStaticSync?: boolean;
  /** Skip Play Store discovery (slow); reconcile + feedback only. */
  skipDiscovery?: boolean;
  /** Skip missing-app feedback queue. */
  skipFeedback?: boolean;
}): Promise<SearchDiscoveryReport & { reconcile: Awaited<ReturnType<typeof reconcileResolvableSearchFailures>> }> {
  let staticResolved = 0;
  if (!options?.skipStaticSync) {
    await syncPriorityStaticSearchAliasOverrides();
    await syncAllStaticSearchAliasOverrides();
    staticResolved = await reconcileStaticAliasSearchFailures(3000);
  }

  const feedback = options?.skipFeedback
    ? {
        feedbackProcessed: 0,
        feedbackResolved: 0,
        aliasesCreated: 0,
        searchFailuresResolved: 0,
        discoveryAttempts: 0,
        discoveryMisses: 0,
      }
    : await repairMissingAppFeedback({ limit: options?.feedbackLimit });

  const discovery = options?.skipDiscovery
    ? { aliasesCreated: 0, searchFailuresResolved: 0, discoveryAttempts: 0, discoveryMisses: 0 }
    : await repairSearchFailuresViaDiscovery({ limit: options?.searchFailureLimit });

  const reconcile = await reconcileResolvableSearchFailures({
    batchSize: 500,
    maxChecks: options?.reconcileMaxChecks ?? 5000,
    liveProbeLimit: options?.reconcileLiveProbeLimit ?? 500,
    liveProbeTimeoutMs: options?.reconcileLiveProbeTimeoutMs ?? 12_000,
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
