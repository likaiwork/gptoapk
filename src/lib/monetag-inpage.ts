import { MONETAG_MAIN_ZONE, monetagInPagePushScriptUrl } from "@/lib/monetag";

export const MONETAG_INPAGE_SCRIPT_ID = `monetag-inpage-${MONETAG_MAIN_ZONE}`;

/** Loads Monetag in-page banners only (no popunder / vignette). */
export function injectMonetagInPageScript(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(MONETAG_INPAGE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = MONETAG_INPAGE_SCRIPT_ID;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  script.src = monetagInPagePushScriptUrl();
  document.head.appendChild(script);
}
