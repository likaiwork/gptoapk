export const COOKIE_CONSENT_STORAGE_KEY = "gptoapk-cookie-consent";

export type CookieConsentChoice = "accepted" | "rejected" | null;

export function getCookieConsent(): CookieConsentChoice {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return null;
}

export function hasAdvertisingConsent(): boolean {
  return getCookieConsent() === "accepted";
}
