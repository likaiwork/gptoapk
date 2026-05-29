import { initDatabase, logSearchFailure, resolveSearchFailuresForQuery } from "@/lib/db";
import {
  buildSearchFailureKey,
  normalizeSearchQuery,
  type SearchFailureKind,
} from "@/lib/search-failure-key";

export async function recordSearchFailure(params: {
  query: string;
  queryType: string;
  failureKind: SearchFailureKind;
  lastError?: string;
  lang?: string;
  country?: string;
}): Promise<void> {
  const trimmed = params.query.trim();
  if (!trimmed) return;

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
  } catch (error) {
    console.warn(
      "[recordSearchFailure]",
      error instanceof Error ? error.message : error,
    );
  }
}

export async function recordSearchSuccess(query: string, queryType: string): Promise<void> {
  const trimmed = query.trim();
  if (!trimmed) return;

  try {
    await initDatabase();
    await resolveSearchFailuresForQuery(trimmed, queryType);
  } catch (error) {
    console.warn(
      "[recordSearchSuccess]",
      error instanceof Error ? error.message : error,
    );
  }
}
