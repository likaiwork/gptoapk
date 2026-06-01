/** Same URL / brand shortcuts as /api/search-apps before query-type detection. */
export function normalizeUserSearchQuery(query: string): string {
  const trimmed = query.trim();
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
  if (/^https?:\/\/(www\.)?netflix\.com\/?/i.test(trimmed)) return "netflix";
  if (/^https?:\/\/(open\.)?spotify\.com\/?/i.test(trimmed)) return "spotify";
  if (/^https?:\/\/(www\.)?gemini\.google\.com\/?/i.test(trimmed)) return "gemini";
  if (/^https?:\/\/(www\.)?claude\.ai\/?/i.test(trimmed)) return "claude";
  if (/^https?:\/\/(www\.)?deepseek\.com\/?/i.test(trimmed)) return "deepseek";
  return trimmed;
}
