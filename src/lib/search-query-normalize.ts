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

/** Common typos → canonical term (matched against search-aliases). */
const SEARCH_TYPO_CORRECTIONS: Readonly<Record<string, string>> = {
  陶宝: "淘宝",
  拖宝: "淘宝",
  淘寳: "淘宝",
  youtobe: "youtube",
  "you tobe": "youtube",
  youtub: "youtube",
  twlegram: "telegram",
  telegrame: "telegram",
  telegran: "telegram",
  "blue s k y": "bluesky",
  "blue sky": "bluesky",
  papago: "papago translate",
  "pocket camp complete": "pocket camp",
  口袋营地: "pocket camp",
  王者: "王者荣耀",
  "微信 输入法": "微信输入法",
};

export function applySearchTypoCorrection(query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return query;

  for (const key of [trimmed, stripSearchQueryNoise(trimmed)]) {
    const normalized = normalizeAliasKey(key);
    const canonical = SEARCH_TYPO_CORRECTIONS[normalized];
    if (canonical) return canonical;
  }

  return query;
}

export function getAliasLookupKeys(query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const corrected = applySearchTypoCorrection(trimmed);
  const keys: string[] = [];
  const seen = new Set<string>();

  const add = (value: string) => {
    const key = normalizeAliasKey(value);
    if (key && !seen.has(key)) {
      seen.add(key);
      keys.push(key);
    }
  };

  add(trimmed);
  add(corrected);
  add(stripSearchQueryNoise(trimmed));
  add(stripSearchQueryNoise(corrected));

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
