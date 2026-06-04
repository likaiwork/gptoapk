import { stripInvisibleSearchChars } from "@/lib/search-query-normalize";

/** Google Play search page URL → search term (e.g. store/search?q=schwab+mobile). */
export function extractPlayStoreSearchTerm(query: string): string | null {
  const cleanQuery = stripInvisibleSearchChars(query);
  const candidate = /^https?:\/\//i.test(cleanQuery) ? cleanQuery : `https://${cleanQuery}`;

  try {
    const url = new URL(candidate);
    if (!url.hostname.endsWith("play.google.com")) return null;
    if (!url.pathname.includes("/store/search")) return null;

    const term = url.searchParams.get("q")?.trim();
    if (!term) return null;

    return decodeURIComponent(term.replace(/\+/g, " ")).trim();
  } catch {
    return null;
  }
}

/** Same URL / brand shortcuts as /api/search-apps before query-type detection. */
export function normalizeUserSearchQuery(query: string): string {
  const trimmed = stripInvisibleSearchChars(query).trim();
  const playSearchTerm = extractPlayStoreSearchTerm(trimmed);
  if (playSearchTerm) return playSearchTerm;
  if (/^https?:\/\/(www\.)?grok\.com\/?/i.test(trimmed)) return "grok";
  if (/^https?:\/\/(www\.)?facebook\.com\/?/i.test(trimmed)) return "facebook";
  if (/^https?:\/\/(www\.)?messenger\.com\/?/i.test(trimmed)) return "facebook messenger";
  if (/^https?:\/\/(www\.)?tiktok\.com\/?/i.test(trimmed)) return "tiktok";
  if (/^https?:\/\/(www\.)?business\.tiktok\.com\/?/i.test(trimmed)) return "tiktok";
  if (/^https?:\/\/((www|m)\.)?youtube\.com\/?/i.test(trimmed)) return "youtube";
  if (/^https?:\/\/youtu\.be\//i.test(trimmed)) return "youtube";
  if (/^https?:\/\/(www\.)?(twitter|x)\.com\/?/i.test(trimmed)) return "twitter";
  if (/^https?:\/\/(www\.)?whatsapp\.com\/?/i.test(trimmed)) return "whatsapp";
  if (/^https?:\/\/(www\.)?web\.whatsapp\.com\/?/i.test(trimmed)) return "whatsapp";
  if (/^https?:\/\/wa\.me\//i.test(trimmed)) return "whatsapp";
  if (/^https?:\/\/([\w-]+\.)?zoom\.us\//i.test(trimmed)) return "zoom";
  if (/^zoommtg:/i.test(trimmed)) return "zoom";
  if (/^https?:\/\/(www\.)?(ibkr|interactivebrokers)\.com\/?/i.test(trimmed)) return "ibkr";
  if (/^https?:\/\/(www\.)?tigerbrokers\.com\/?/i.test(trimmed)) return "tiger";
  if (/^https?:\/\/(www\.)?futu\.com\/?/i.test(trimmed)) return "futu";
  if (/^https?:\/\/(www\.)?longbridge\.com\/?/i.test(trimmed)) return "longbridge";
  if (/^https?:\/\/(www\.)?(telegram|t)\.(org|me)\/?/i.test(trimmed)) return "telegram";
  if (/^https?:\/\/(www\.)?instagram\.com\/?/i.test(trimmed)) return "instagram";
  if (/^https?:\/\/(www\.)?discord(?:app)?\.com\/?/i.test(trimmed)) return "discord";
  if (/^https?:\/\/(www\.)?(qq|im)\.qq\.com\/?/i.test(trimmed)) return "qq";
  if (/^https?:\/\/(www\.)?weixin\.qq\.com\/?/i.test(trimmed)) return "微信";
  if (/^https?:\/\/([\w-]+\.)?fastgouji\.com\/?/i.test(trimmed)) return "狗急";
  if (/^https?:\/\/([\w-]+\.)?acelaowang\.net\/?/i.test(trimmed)) return "老王";
  if (/^https?:\/\/(www\.)?netflix\.com\/?/i.test(trimmed)) return "netflix";
  if (/^https?:\/\/(open\.)?spotify\.com\/?/i.test(trimmed)) return "spotify";
  if (/^https?:\/\/(www\.)?openai\.com\/?/i.test(trimmed)) return "chatgpt";
  if (/^https?:\/\/(www\.)?chat\.openai\.com\/?/i.test(trimmed)) return "chatgpt";
  if (/^https?:\/\/(www\.)?gemini\.google\.com\/?/i.test(trimmed)) return "gemini";
  if (/^https?:\/\/(www\.)?claude\.ai\/?/i.test(trimmed)) return "claude";
  if (/^https?:\/\/(www\.)?vietcombank\.com\.vn\/?/i.test(trimmed)) return "vietcombank";
  if (/^https?:\/\/(www\.)?techcombank\.com\.vn\/?/i.test(trimmed)) return "techcombank";
  if (/^https?:\/\/(www\.)?bidv\.com\.vn\/?/i.test(trimmed)) return "bidv";
  if (/^https?:\/\/(www\.)?mbbank\.com\.vn\/?/i.test(trimmed)) return "mb bank";
  if (/^https?:\/\/(www\.)?momo\.vn\/?/i.test(trimmed)) return "momo";
  if (/^https?:\/\/(www\.)?zalopay\.vn\/?/i.test(trimmed)) return "zalopay";
  if (/^https?:\/\/(www\.)?grab\.com\/?/i.test(trimmed)) return "grab";
  if (/^https?:\/\/(www\.)?gojek\.com\/?/i.test(trimmed)) return "gojek";
  if (/^https?:\/\/(www\.)?shopee\.(vn|com)\/?/i.test(trimmed)) return "shopee";
  if (/^https?:\/\/(www\.)?copilot\.microsoft\.com\/?/i.test(trimmed)) return "copilot";
  if (/^https?:\/\/(www\.)?perplexity\.ai\/?/i.test(trimmed)) return "perplexity";
  if (/^https?:\/\/(www\.)?deepseek\.com\/?/i.test(trimmed)) return "deepseek";
  return trimmed;
}
