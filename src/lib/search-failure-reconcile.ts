import { getCuratedSearchAppMeta } from "@/lib/curated-search-apps";
import {
  resolvePlayPackageIdAlias,
  resolveSearchAliasAppIds,
} from "@/lib/search-aliases";
import { isVpnSearchKeyword } from "@/lib/search-query-normalize";

const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

/** Whether search would now return results via alias map, curated fallback, or VPN list. */
export function canResolveSearchQueryNow(rawQuery: string): boolean {
  const trimmed = rawQuery.trim();
  if (!trimmed) return false;

  if (isVpnSearchKeyword(trimmed)) return true;

  if (resolveSearchAliasAppIds(trimmed)?.length) return true;

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
