import { normalizeUserSearchQuery } from "@/lib/normalize-user-search-query";
import {
  applySearchTypoCorrection,
  getAliasLookupKeys,
  normalizeAliasKey,
  stripInvisibleSearchChars,
  stripSearchQueryNoise,
} from "@/lib/search-query-normalize";

const FUZZY_BRAND_TARGETS = [
  "facebook",
  "telegram",
  "instagram",
  "whatsapp",
  "youtube",
  "tiktok",
  "twitter",
  "discord",
  "netflix",
  "spotify",
  "snapchat",
  "linkedin",
] as const;

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i]![0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0]![j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i]![j] = Math.min(
        matrix[i - 1]![j]! + 1,
        matrix[i]![j - 1]! + 1,
        matrix[i - 1]![j - 1]! + cost,
      );
    }
  }

  return matrix[a.length]![b.length]!;
}

/** Suggest a canonical brand name when the query is 1–2 edits away (e.g. fackbook → facebook). */
export function suggestFuzzyBrandQuery(query: string): string | null {
  const key = normalizeAliasKey(stripSearchQueryNoise(query) || query);
  if (key.length < 4 || key.length > 24) return null;

  for (const brand of FUZZY_BRAND_TARGETS) {
    if (Math.abs(key.length - brand.length) > 2) continue;
    if (levenshtein(key, brand) <= 2 && key !== brand) return brand;
  }

  return null;
}

function stripApkFileSuffix(query: string): string {
  return query.replace(/\.apk$/i, "").trim();
}

/** Ordered unique search terms to try (alias lookup + Play search). */
export function expandSearchQueryVariants(rawQuery: string): string[] {
  const trimmed = stripInvisibleSearchChars(rawQuery).trim();
  if (!trimmed) return [];

  const withoutApk = stripApkFileSuffix(trimmed);
  const normalized = normalizeUserSearchQuery(withoutApk);
  const seeds = [
    withoutApk,
    normalized,
    applySearchTypoCorrection(withoutApk),
    applySearchTypoCorrection(normalized),
  ];

  const variants: string[] = [];
  const seen = new Set<string>();

  const add = (value: string) => {
    const key = value.trim();
    if (!key) return;
    const normalizedKey = normalizeAliasKey(key);
    if (seen.has(normalizedKey)) return;
    seen.add(normalizedKey);
    variants.push(key);
  };

  for (const seed of seeds) {
    if (!seed) continue;
    add(seed);
    add(stripSearchQueryNoise(seed));
    for (const aliasKey of getAliasLookupKeys(seed)) {
      add(aliasKey);
    }
    const fuzzy = suggestFuzzyBrandQuery(seed);
    if (fuzzy) add(fuzzy);
  }

  return variants;
}
