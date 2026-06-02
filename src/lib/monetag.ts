/** Monetag MultiTag — Sharp-witted tag (gptoapk.com) */
export const MONETAG_SW_DOMAIN = "3nbf4.com";

/** Main zone from Monetag dashboard — use on script tag and banner slots */
export const MONETAG_MAIN_ZONE = 242821;

/** Site tag from Monetag “Get tag” (Sharp-witted / MultiTag). Re-copy if Monetag rotates CDN. */
export const MONETAG_TAG_SCRIPT_SRC = "https://quge5.com/88/tag.min.js";

/** Viewports at or below this width skip MultiTag (in-page push / vignette / onclick). */
export const MOBILE_AD_BREAKPOINT_PX = 768;

export function isMobileAdViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${MOBILE_AD_BREAKPOINT_PX}px)`).matches;
}

/** Best-effort cleanup when blocking Monetag on mobile (push SW). */
export async function unregisterMonetagServiceWorkers(): Promise<void> {
  try {
    if ("serviceWorker" in navigator && navigator.serviceWorker) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map((reg) => reg.unregister().catch(() => undefined)));
    }
  } catch {
    // ignore
  }
}

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
