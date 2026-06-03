import { getAliasLookupKeys } from "@/lib/search-query-normalize";
import {
  getSearchAliasOverrideAppIds,
  upsertSearchAliasOverrideKeys,
} from "@/lib/db";

export async function resolveSearchAliasOverrideAppIds(
  query: string,
): Promise<string[] | null> {
  const keys = getAliasLookupKeys(query);
  if (!keys.length) return null;
  return getSearchAliasOverrideAppIds(keys);
}

export async function saveSearchAliasOverrideForQuery(params: {
  query: string;
  appIds: string[];
  sourceQuery?: string;
  sourceLabel?: string;
}): Promise<number> {
  const keys = getAliasLookupKeys(params.query);
  if (!keys.length || !params.appIds.length) return 0;
  return upsertSearchAliasOverrideKeys({
    aliasKeys: keys,
    appIds: params.appIds,
    sourceQuery: params.sourceQuery ?? params.query,
    sourceLabel: params.sourceLabel ?? "auto-repair",
  });
}
