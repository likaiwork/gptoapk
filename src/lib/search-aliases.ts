/**
 * Brand nicknames and abbreviations that Google Play search often misses.
 * Maps normalized query → Google Play package id(s).
 */
export const SEARCH_ALIAS_APP_IDS: Readonly<Record<string, readonly string[]>> = {
  ibkr: ["atws.app"],
  "ibkr mobile": ["atws.app"],
  "interactive brokers": ["atws.app"],
  interactivebrokers: ["atws.app"],
  盈透: ["atws.app"],
  盈透证券: ["atws.app"],
};

export function resolveSearchAliasAppIds(query: string): readonly string[] | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const candidates = [trimmed.toLowerCase(), trimmed];
  for (const key of candidates) {
    const appIds = SEARCH_ALIAS_APP_IDS[key];
    if (appIds?.length) return appIds;
  }

  return null;
}
