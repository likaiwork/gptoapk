/** Client-safe helpers — keep node:crypto out of this module. */

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
