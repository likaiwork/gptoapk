import { createHash } from "node:crypto";
import { stripInvisibleSearchChars } from "@/lib/search-query-normalize";

export type SearchFailureKind =
  | "no_results"
  | "search_error"
  | "invalid_url"
  | "query_too_long"
  | "client_error";

export function normalizeSearchQuery(query: string): string {
  return stripInvisibleSearchChars(query).trim().toLowerCase().replace(/\s+/g, " ");
}

export function buildSearchFailureKey(
  query: string,
  queryType: string,
  failureKind: SearchFailureKind,
): string {
  const normalized = normalizeSearchQuery(query);
  const prefix = `${failureKind}|${queryType}|`;
  const full = `${prefix}${normalized}`;
  if (full.length <= 450) return full;
  const hash = createHash("sha256").update(normalized).digest("hex").slice(0, 32);
  return `${prefix}${hash}`;
}

export { formatSearchFailureKind } from "@/lib/search-failure-format";
