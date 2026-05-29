import { proxyImageUrl } from "@/lib/image-proxy";

/** Apps that gplay.app() often cannot fetch; search still returns a verifiable package id. */
export type CuratedSearchAppMeta = {
  appId: string;
  title: string;
  summary: string;
  developer: string;
  developerId: string;
  iconUrl: string;
  playUrl: string;
};

const CURATED_BY_APP_ID: Readonly<Record<string, CuratedSearchAppMeta>> = {
  "com.android.vending": {
    appId: "com.android.vending",
    title: "Google Play Store",
    summary: "Official Android app store to browse, install, and update apps and games.",
    developer: "Google LLC",
    developerId: "Google+LLC",
    iconUrl:
      "https://play-lh.googleusercontent.com/kSsoniKnHcxnPAhTyiSRJXrRhANxnmXnCNk0ZnZ3AY4=w240-h480-rw",
    playUrl: "https://play.google.com/store/apps/details?id=com.android.vending",
  },
};

export function getCuratedSearchAppMeta(appId: string): CuratedSearchAppMeta | null {
  return CURATED_BY_APP_ID[appId.trim().toLowerCase()] ?? null;
}

export function buildCuratedSearchResult(meta: CuratedSearchAppMeta) {
  return {
    appId: meta.appId,
    title: meta.title,
    summary: meta.summary,
    developer: meta.developer,
    developerId: meta.developerId,
    icon: proxyImageUrl(meta.iconUrl),
    score: null,
    scoreText: null,
    priceText: null,
    free: true,
    version: null,
    size: null,
    updated: null,
    url: meta.playUrl,
  };
}
