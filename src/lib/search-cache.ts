export const SEARCH_CACHE_PREFIX = "gptoapk.searchState:";
export const SEARCH_RESET_EVENT = "gptoapk-search-reset";

export function getSearchCacheKey(pathname: string) {
  return `${SEARCH_CACHE_PREFIX}${pathname}`;
}

export function clearSearchCacheForPath(pathname: string) {
  try {
    sessionStorage.removeItem(getSearchCacheKey(pathname));
  } catch {
    // Ignore storage errors.
  }
}

/** True when user returned via browser back/forward (not a fresh link to home). */
export function shouldRestoreSearchFromCache() {
  if (typeof window === "undefined") return false;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return nav?.type === "back_forward";
}

export function dispatchSearchReset(pathname: string) {
  if (typeof window === "undefined") return;
  clearSearchCacheForPath(pathname);
  window.dispatchEvent(
    new CustomEvent(SEARCH_RESET_EVENT, { detail: { pathname } })
  );
}
