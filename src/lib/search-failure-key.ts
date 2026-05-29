import { createHash } from "node:crypto";

export type SearchFailureKind =
  | "no_results"
  | "search_error"
  | "invalid_url"
  | "query_too_long"
  | "client_error";

export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
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

export function formatSearchFailureKind(kind: string): string {
  switch (kind) {
    case "no_results":
      return "无结果";
    case "search_error":
      return "搜索异常";
    case "invalid_url":
      return "无效链接";
    case "query_too_long":
      return "关键词过长";
    case "client_error":
      return "客户端失败";
    default:
      return kind || "未知";
  }
}
