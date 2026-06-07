import { getKnownAppSearchMeta } from "@/lib/curated-search-apps";
import {
  extractPlayStoreSearchTerm,
  normalizeUserSearchQuery,
} from "@/lib/normalize-user-search-query";
import {
  resolvePlayPackageIdAlias,
  resolveSearchAliasAppIds,
} from "@/lib/search-aliases";
import { resolveSearchAliasOverrideAppIds } from "@/lib/search-alias-overrides";
import {
  extractPlayStorePackageId,
  isVpnSearchKeyword,
  stripInvisibleSearchChars,
} from "@/lib/search-query-normalize";
import { expandSearchQueryVariants } from "@/lib/search-query-variants";
import { isUnsupportedNoMirrorApp } from "@/lib/unsupported-no-mirror-apps";

const PACKAGE_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+$/;

function parseGooglePlayUrl(query: string) {
  const appId = extractPlayStorePackageId(query);
  if (!appId) return null;
  return { appId: resolvePlayPackageIdAlias(appId) };
}

function getQueryType(query: string): "url" | "package" | "keyword" {
  const trimmed = stripInvisibleSearchChars(query).trim();
  if (extractPlayStorePackageId(trimmed)) return "url";
  if (/^https?:\/\//i.test(trimmed)) return "url";
  if (trimmed.includes("play.google.com")) return "url";
  if (PACKAGE_NAME_REGEX.test(trimmed)) return "package";
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
  for (const variant of expandSearchQueryVariants(query)) {
    if (aliasWouldReturnResults(variant)) return true;
  }
  return false;
}

/**
 * Mirrors /api/search-apps success paths (alias, VPN list, package/URL, known-app fallback).
 * Does not call Google Play — keyword-only misses without an alias are left unresolved.
 */
export async function canResolveSearchQueryNowAsync(rawQuery: string): Promise<boolean> {
  if (canResolveSearchQueryNow(rawQuery)) return true;
  const override = await resolveSearchAliasOverrideAppIds(rawQuery);
  return Boolean(override?.length);
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
  const trimmed = stripInvisibleSearchChars(query).trim();
  if (!trimmed) return false;
  if (/^file:\/\//i.test(trimmed)) return false;
  if (/^https?:\/\//i.test(trimmed) && !trimmed.includes("play.google.com")) return false;
  if (failureKind === "query_too_long") return false;
  return true;
}

function repairSiteOrigin(): string {
  const host =
    process.env.REPAIR_SITE_HOST ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.gptoapk.com";
  return host.replace(/\/$/, "");
}

/** Calls production search-apps to verify a keyword now returns results (for cron reconcile). */
export async function probeLiveSearchHasResults(
  query: string,
  options?: { lang?: string; country?: string; timeoutMs?: number },
): Promise<boolean> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length > 200) return false;

  const lang = (options?.lang || "en").slice(0, 8);
  const country = (options?.country || (lang === "zh" ? "cn" : "us")).slice(0, 8);
  const params = new URLSearchParams({ q: trimmed, hl: lang, gl: country });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), options?.timeoutMs ?? 22_000);

  try {
    const res = await fetch(`${repairSiteOrigin()}/api/search-apps?${params}`, {
      signal: controller.signal,
      cache: "no-store",
      headers: { "User-Agent": "gptoapk-search-reconcile/1.0" },
    });
    const data = (await res.json().catch(() => ({}))) as { results?: unknown[] };
    return res.ok && Array.isArray(data.results) && data.results.length > 0;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
