/** Shared normalization for alias lookup and search-failure reconciliation. */

export function stripInvisibleSearchChars(query: string): string {
  return query.replace(/[\u200B-\u200D\u2060\uFEFF]/g, "");
}

export function fixMalformedUrlQuery(query: string): string {
  let q = stripInvisibleSearchChars(query).trim();
  if (/^ttps:\/\//i.test(q)) q = `h${q}`;
  if (/^h?t?tps:\/\//i.test(q) && !/^https?:\/\//i.test(q)) q = q.replace(/^h?t?tps:\/\//i, "https://");
  if (/^play\.google\.com\//i.test(q)) q = `https://${q}`;
  return q;
}

/** Extract package id from Play details URL even when scheme is broken (e.g. ttps://). */
export function extractPlayStorePackageId(query: string): string | null {
  const fixed = fixMalformedUrlQuery(query);
  const withScheme = /^https?:\/\//i.test(fixed)
    ? fixed
    : fixed.includes("play.google.com") && fixed.includes("id=")
      ? `https://${fixed.replace(/^\/+/, "")}`
      : fixed;

  if (!withScheme.includes("play.google.com")) return null;

  try {
    const url = new URL(withScheme);
    const appId = url.searchParams.get("id")?.trim();
    return appId || null;
  } catch {
    const match = withScheme.match(/[?&]id=([a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+)/);
    return match?.[1]?.trim() || null;
  }
}

export function normalizeAliasKey(query: string): string {
  return stripInvisibleSearchChars(query).trim().toLowerCase().replace(/\s+/g, " ");
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
  let q = stripInvisibleSearchChars(query).trim();
  if (!q) return "";

  q = q.replace(/\.apk$/i, "").trim();

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

const PACKAGE_NAME_PATTERN = /[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z][a-zA-Z0-9_]*)+/g;

/** Strip markdown bullets / code fences so `` `com.foo.bar` `` → com.foo.bar */
export function stripMarkdownAndCodeFences(query: string): string {
  return query
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^[\s\-•*]+/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Pull the first plausible package id out of noisy admin / paste input. */
export function extractEmbeddedPackageId(query: string): string | null {
  const clean = stripMarkdownAndCodeFences(stripInvisibleSearchChars(query));
  const matches = clean.match(PACKAGE_NAME_PATTERN) || [];
  for (const id of matches) {
    const parts = id.split(".");
    if (parts.length >= 2 && parts.every((p) => p.length > 0)) return id;
  }
  return null;
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
  tiktop: "tiktok",
  tiptok: "tiktok",
  titok: "tiktok",
  fackbook: "facebook",
  facbook: "facebook",
  facebok: "facebook",
  facebbok: "facebook",
  fcaebook: "facebook",
  telega: "telegram",
  telegr: "telegram",
  telegrm: "telegram",
  telgram: "telegram",
  telegra: "telegram",
  instagrm: "instagram",
  instagrma: "instagram",
  whatsappp: "whatsapp",
  whastapp: "whatsapp",
  whatsap: "whatsapp",
  youtubee: "youtube",
  efootball: "efootball",
  "e football": "efootball",
  goole: "google",
  goga: "google",
  "pla推特": "twitter",
  "play服务": "google play services",
  "play 服务": "google play services",
  googleplayservice: "google play services",
  "google play service": "google play services",
  盈利证劵: "盈立证券",
  盈利证券: "盈立证券",
  致富证劵: "致富证券",
  致富证券: "致富证券",
  tudemate: "tubemate",
  xiaoyiguanjia: "小翼管家",
  googieplay: "google play",
  "gooogle play": "google play",
  ergdata: "ergdata",
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
