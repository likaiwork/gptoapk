import {
  MONETAG_MAIN_ZONE,
  MONETAG_TAG_SCRIPT_SRC,
} from "@/lib/monetag";

export const MONETAG_TAG_SCRIPT_ID = `monetag-tag-${MONETAG_MAIN_ZONE}`;

/**
 * Loads the Monetag site tag (tag.min.js). In-Page Push / banners use this tag.
 * Note: the old `/401/{zone}` URL returns 404 and must not be used.
 */
export function injectMonetagTagScript(): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(MONETAG_TAG_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = MONETAG_TAG_SCRIPT_ID;
  script.src = MONETAG_TAG_SCRIPT_SRC;
  script.async = true;
  script.setAttribute("data-cfasync", "false");
  script.setAttribute("data-zone", String(MONETAG_MAIN_ZONE));
  document.head.appendChild(script);
}

/** @deprecated Use injectMonetagTagScript */
export const injectMonetagInPageScript = injectMonetagTagScript;
