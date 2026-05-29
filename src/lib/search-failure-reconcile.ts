import { getCuratedSearchAppMeta } from "@/lib/curated-search-apps";
import {
  resolvePlayPackageIdAlias,
  resolveSearchAliasAppIds,
} from "@/lib/search-aliases";
import { normalizeSearchQuery } from "@/lib/search-failure-key";

const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

/** Whether search would now return results via alias map or curated fallback. */
export function canResolveSearchQueryNow(rawQuery: string): boolean {
  const trimmed = rawQuery.trim();
  if (!trimmed) return false;

  if (resolveSearchAliasAppIds(trimmed)?.length) return true;

  const normalized = normalizeSearchQuery(trimmed);
  if (normalized !== trimmed && resolveSearchAliasAppIds(normalized)?.length) {
    return true;
  }

  if (PACKAGE_NAME_REGEX.test(trimmed)) {
    const resolvedId = resolvePlayPackageIdAlias(trimmed);
    if (getCuratedSearchAppMeta(resolvedId)) return true;
  }

  return false;
}

export function shouldPersistSearchFailure(
  query: string,
  failureKind: string,
): boolean {
  const trimmed = query.trim();
  if (!trimmed) return false;
  if (/^file:\/\//i.test(trimmed)) return false;
  if (failureKind === "query_too_long") return false;
  return true;
}
