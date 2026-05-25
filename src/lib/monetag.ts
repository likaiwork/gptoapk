/** Monetag MultiTag — Sharp-witted tag (gptoapk.com) */
export const MONETAG_SW_DOMAIN = "3nbf4.com";

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
  return (
    excluded.some((p) => pathname === p || pathname.endsWith(p)) ||
    pathname.startsWith("/api/")
  );
}
