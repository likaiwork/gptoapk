/**
 * Adsterra publisher configuration for gptoapk.com
 * Dashboard: https://beta.publishers.adsterra.com/websites
 *
 *   6203742  = zone / website id
 *   32301269 = Native Banner placement id
 *
 * The two numbers above are dashboard identifiers only — the actual ad tag is
 * the snippet from
 *   Websites → <site> → All codes → Native Banner → Get code
 * The script URL and container id from that snippet are stored below. Either
 * can be overridden by its matching NEXT_PUBLIC_* variable, which lets the tag
 * be rotated without a code deploy.
 */
export const ADSTERRA_WEBSITE_ID = 6203742;
export const ADSTERRA_NATIVE_BANNER_PLACEMENT_ID = 32301269;

/** Full script URL from "Get code". */
const NATIVE_BANNER_SCRIPT_SRC_FALLBACK =
  "https://bellnewyork.org/21/c6b570c2c5d835b371a9e0261a6305dc";

/** Container element id from "Get code". Must match the script's target. */
const NATIVE_BANNER_CONTAINER_ID_FALLBACK =
  "container-c6b570c2c5d835b371a9e0261a6305dc";

export const ADSTERRA_NATIVE_BANNER_SCRIPT_SRC = (
  process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_BANNER_SCRIPT_SRC ||
  NATIVE_BANNER_SCRIPT_SRC_FALLBACK
).trim();

export const ADSTERRA_NATIVE_BANNER_CONTAINER_ID = (
  process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_BANNER_CONTAINER_ID ||
  NATIVE_BANNER_CONTAINER_ID_FALLBACK
).trim();

export function isAdsterraNativeBannerConfigured(): boolean {
  return Boolean(
    ADSTERRA_NATIVE_BANNER_SCRIPT_SRC &&
      ADSTERRA_NATIVE_BANNER_CONTAINER_ID
  );
}
