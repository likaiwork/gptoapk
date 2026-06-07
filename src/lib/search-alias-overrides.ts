import { getAliasLookupKeys } from "@/lib/search-query-normalize";
import { expandSearchQueryVariants } from "@/lib/search-query-variants";
import {
  getSearchAliasOverrideAppIds,
  upsertSearchAliasOverrideKeys,
} from "@/lib/db";

function aliasKeysForQuery(query: string): string[] {
  const keys = expandSearchQueryVariants(query).flatMap((variant) => getAliasLookupKeys(variant));
  return [...new Set(keys)];
}

export async function resolveSearchAliasOverrideAppIds(
  query: string,
): Promise<string[] | null> {
  const keys = aliasKeysForQuery(query);
  if (!keys.length) return null;
  return getSearchAliasOverrideAppIds(keys);
}

export async function saveSearchAliasOverrideForQuery(params: {
  query: string;
  appIds: string[];
  sourceQuery?: string;
  sourceLabel?: string;
}): Promise<number> {
  const keys = aliasKeysForQuery(params.query);
  if (!keys.length || !params.appIds.length) return 0;
  return upsertSearchAliasOverrideKeys({
    aliasKeys: keys,
    appIds: params.appIds,
    sourceQuery: params.sourceQuery ?? params.query,
    sourceLabel: params.sourceLabel ?? "auto-repair",
  });
}
