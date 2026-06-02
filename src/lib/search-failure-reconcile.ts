import { getKnownAppSearchMeta } from "@/lib/curated-search-apps";
import {
  extractPlayStoreSearchTerm,
  normalizeUserSearchQuery,
} from "@/lib/normalize-user-search-query";
import {
  resolvePlayPackageIdAlias,
  resolveSearchAliasAppIds,
} from "@/lib/search-aliases";
import { isVpnSearchKeyword, stripSearchQueryNoise } from "@/lib/search-query-normalize";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";

const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

function parseGooglePlayUrl(query: string) {
  const candidate = /^https?:\/\//i.test(query) ? query : `https://${query}`;

  try {
    const url = new URL(candidate);
    if (!url.hostname.endsWith("play.google.com")) return null;

    const appId = url.searchParams.get("id")?.trim();
    if (!appId) return null;

    return { appId: resolvePlayPackageIdAlias(appId) };
  } catch {
    return null;
  }
}

function getQueryType(query: string): "url" | "package" | "keyword" {
  if (query.includes("play.google.com")) return "url";
  if (PACKAGE_NAME_REGEX.test(query)) return "package";
  return "keyword";
}

function packageWouldReturnResults(appId: string): boolean {
  const resolvedId = resolvePlayPackageIdAlias(appId);
  if (isUnsupportedNoMirrorApp(resolvedId)) return false;
  return true;
}

function aliasWouldReturnResults(query: string): boolean {
  const appIds = resolveSearchAliasAppIds(query);
  if (!appIds?.length) return false;
  return appIds.some((id) => {
    const resolved = resolvePlayPackageIdAlias(id);
    if (getKnownAppSearchMeta(resolved)) return true;
    return !isUnsupportedNoMirrorApp(resolved);
  });
}

function keywordWouldReturnResults(query: string): boolean {
  if (aliasWouldReturnResults(query)) return true;
  const stripped = stripSearchQueryNoise(query);
  if (stripped.length >= 2 && stripped !== query.trim().toLowerCase()) {
    return aliasWouldReturnResults(stripped);
  }
  return false;
}

/**
 * Mirrors /api/search-apps success paths (alias, VPN list, package/URL, known-app fallback).
 * Does not call Google Play — keyword-only misses without an alias are left unresolved.
 */
export function canResolveSearchQueryNow(rawQuery: string): boolean {
  const trimmed = rawQuery.trim();
  if (!trimmed) return false;

  if (extractPlayStoreSearchTerm(trimmed)) {
    const term = normalizeUserSearchQuery(trimmed);
    return keywordWouldReturnResults(term) || isVpnSearchKeyword(term);
  }

  const query = normalizeUserSearchQuery(trimmed);
  if (!query) return false;

  if (isVpnSearchKeyword(query)) return true;

  const queryType = getQueryType(query);

  if (queryType === "url") {
    const parsed = parseGooglePlayUrl(query);
    if (!parsed) return false;
    return packageWouldReturnResults(parsed.appId);
  }

  if (queryType === "package") {
    return packageWouldReturnResults(query);
  }

  return keywordWouldReturnResults(query);
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
