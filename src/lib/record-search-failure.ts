import { initDatabase, logSearchFailure, resolveSearchFailuresForQuery } from "@/lib/db";
import {
  buildSearchFailureKey,
  normalizeSearchQuery,
  type SearchFailureKind,
} from "@/lib/search-failure-key";
import { shouldPersistSearchFailure } from "@/lib/search-failure-reconcile";
import { scheduleSearchFailureAutoDiscovery } from "@/lib/search-auto-discover";
import { expandSearchQueryVariants } from "@/lib/search-query-variants";

export async function recordSearchFailure(params: {
  query: string;
  queryType: string;
  failureKind: SearchFailureKind;
  lastError?: string;
  lang?: string;
  country?: string;
}): Promise<void> {
  const trimmed = params.query.trim();
  if (!shouldPersistSearchFailure(trimmed, params.failureKind)) return;

  try {
    await initDatabase();
    await logSearchFailure({
      query: trimmed,
      queryType: params.queryType,
      failureKind: params.failureKind,
      queryKey: buildSearchFailureKey(trimmed, params.queryType, params.failureKind),
      normalizedQuery: normalizeSearchQuery(trimmed),
      lastError: params.lastError,
      lang: params.lang,
      country: params.country,
    });

    if (params.failureKind === "no_results" || params.failureKind === "search_error") {
      scheduleSearchFailureAutoDiscovery({
        query: trimmed,
        lang: params.lang,
        country: params.country,
      });
    }
  } catch (error) {
    console.warn(
      "[recordSearchFailure]",
      error instanceof Error ? error.message : error,
    );
  }
}

export async function recordSearchSuccess(
  query: string,
  queryType: string,
  rawQuery?: string,
): Promise<void> {
  const seeds = new Set<string>();
  for (const seed of [query, rawQuery?.trim()]) {
    if (!seed) continue;
    seeds.add(seed);
    for (const variant of expandSearchQueryVariants(seed)) {
      seeds.add(variant);
    }
  }
  if (!seeds.size) return;

  try {
    await initDatabase();
    for (const seed of seeds) {
      await resolveSearchFailuresForQuery(seed, queryType);
    }
  } catch (error) {
    console.warn(
      "[recordSearchSuccess]",
      error instanceof Error ? error.message : error,
    );
  }
}
