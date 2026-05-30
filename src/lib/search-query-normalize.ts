/** Shared normalization for alias lookup and search-failure reconciliation. */

export function normalizeAliasKey(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, " ");
}

const TRAILING_NOISE_PATTERNS: RegExp[] = [
  /(?:官方|官网)?(?:apk|app)?(?:下载|安装|更新)(?:链接|教程|地址|方式|指南)?(?:安卓(?:版|下载)?|最新版|手机版|国际版|中文版|汉化版)?$/iu,
  /(?:怎么|如何)(?:下载|安装)(?:到手机)?$/iu,
  /(?:安卓|安卓版|安卓下载|手机版|国际版|中文版|汉化版|最新版|免费版)$/iu,
  /(?:下载|安装|更新)$/u,
  /\s+(?:apk|app|android|download|official|latest|free|install)$/i,
];

const LEADING_NOISE_PATTERNS: RegExp[] = [
  /^(?:下载|安装|更新)\s*/u,
];

/** Strip common download/install suffixes so "chatgpt apk" → "chatgpt". */
export function stripSearchQueryNoise(query: string): string {
  let q = query.trim();
  if (!q) return "";

  q = q.replace(/^https?:\/\//i, "");
  q = q.replace(/^www\./i, "");
  q = q.replace(/\.(com|cn|net|org|io|app|us|me)(?:\/.*)?$/i, "");

  let prev = "";
  while (q !== prev) {
    prev = q;
    for (const pattern of LEADING_NOISE_PATTERNS) {
      q = q.replace(pattern, "").trim();
    }
    for (const pattern of TRAILING_NOISE_PATTERNS) {
      q = q.replace(pattern, "").trim();
    }
    q = q.replace(/\s+(?:apk|app)\s*$/i, "").trim();
  }

  return normalizeAliasKey(q);
}

export function getAliasLookupKeys(query: string): string[] {
  const keys: string[] = [];
  const seen = new Set<string>();

  const add = (value: string) => {
    const key = normalizeAliasKey(value);
    if (key && !seen.has(key)) {
      seen.add(key);
      keys.push(key);
    }
  };

  const trimmed = query.trim();
  if (!trimmed) return [];

  add(trimmed);
  add(stripSearchQueryNoise(trimmed));

  return keys;
}

export function isVpnSearchKeyword(term: string): boolean {
  const q = term.trim().toLowerCase();
  if (!q) return false;
  return (
    q === "vpn" ||
    q.includes("vpn") ||
    q.includes("virtual private network") ||
    q.includes("加速器") ||
    q.includes("翻墙") ||
    q.includes("代理")
  );
}
