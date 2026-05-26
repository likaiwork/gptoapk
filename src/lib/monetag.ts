/** Monetag MultiTag — Sharp-witted tag (gptoapk.com) */
export const MONETAG_SW_DOMAIN = "3nbf4.com";

/**
 * MultiTag bundles Popunder + Push + In-Page Push + Vignette.
 * Popunder fires on many normal page clicks — disable unless you explicitly opt in.
 * Set NEXT_PUBLIC_MONETAG_MULTITAG=true in env to re-enable.
 */
export const MONETAG_MULTITAG_ENABLED =
  process.env.NEXT_PUBLIC_MONETAG_MULTITAG === "true";

/** Main MultiTag zone from dashboard (use in script data-zone and slots) */
export const MONETAG_MAIN_ZONE = 242821;

/** MultiTag loader script — paste from Monetag "Get tag" */
export const MONETAG_TAG_SCRIPT_SRC = "https://quge5.com/88/tag.min.js";

/** Sub-zones (statistics only; do not use in SDK / data-zone) */
export const MONETAG_ZONES = {
  onclick: 11053825,
  inPagePush: 11053826,
  vignette: 11053827,
  push: 11053828,
} as const;

export function monetagInPagePushScriptUrl(zoneId = MONETAG_MAIN_ZONE) {
  return `https://${MONETAG_SW_DOMAIN}/401/${zoneId}`;
}

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

  // Home + search + app detail: users tap Download / links frequently
  if (pathname === "/" || pathname === "/zh" || pathname === "/en") return true;
  if (pathname.startsWith("/app/")) return true;
  if (/^\/(zh|en|ja|ko|ru|pt|es|id|hi|fr|de|vi|ar|tr|it|nl|pl|uk|th|ms|sv|da|fi|nb|cs|ro|el|hu|bn|tl|he|fa|ur)\/app\//.test(pathname)) {
    return true;
  }

  return false;
}
