/** Monetag MultiTag — Sharp-witted tag (gptoapk.com) */
export const MONETAG_SW_DOMAIN = "3nbf4.com";

/** Main zone from Monetag dashboard — use on script tag and banner slots */
export const MONETAG_MAIN_ZONE = 242821;

/** Site tag from Monetag “Get tag” (Sharp-witted / MultiTag). Re-copy if Monetag rotates CDN. */
export const MONETAG_TAG_SCRIPT_SRC = "https://quge5.com/88/tag.min.js";

/** Sub-zones for dashboard statistics; format toggles are managed in Monetag UI */
export const MONETAG_ZONES = {
  onclick: 11053825,
  inPagePush: 11053826,
  vignette: 11053827,
  push: 11053828,
} as const;

/** Pages where intrusive / download-adjacent ads should not load */
export function isMonetagExcludedPath(pathname: string) {
  const excluded = [
    "/privacy",
    "/terms",
    "/disclaimer",
    "/dmca",
    "/contact",
    "/admin",
  ];
  if (
    excluded.some((p) => pathname === p || pathname.endsWith(p)) ||
    pathname.startsWith("/api/")
  ) {
    return true;
  }

  // App detail: keep clear of Download buttons
  if (pathname.startsWith("/app/")) return true;
  if (/^\/(zh|en|ja|ko|ru|pt|es|id|hi|fr|de|vi|ar|tr|it|nl|pl|uk|th|ms|sv|da|fi|nb|cs|ro|el|hu|bn|tl|he|fa|ur)\/app\//.test(pathname)) {
    return true;
  }
  // Blog pages: avoid overlay blocking article links
  if (pathname.startsWith("/blog")) return true;
  if (/^\/(zh|en|ja|ko|ru|pt|es|id|hi|fr|de|vi|ar|tr|it|nl|pl|uk|th|ms|sv|da|fi|nb|cs|ro|el|hu|bn|tl|he|fa|ur)\/blog/.test(pathname)) {
    return true;
  }

  return false;
}
