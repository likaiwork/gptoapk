import { proxyImageUrl } from "@/lib/image-proxy";
import {
  getAliasPackageDisplayName,
  resolvePlayPackageIdAlias,
} from "@/lib/search-aliases";

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
  "atws.app": {
    appId: "atws.app",
    title: "IBKR Mobile",
    summary: "Interactive Brokers mobile trading app.",
    developer: "Interactive Brokers",
    developerId: "Interactive+Brokers",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=atws.app",
  },
  "com.tigerbrokers.stock": {
    appId: "com.tigerbrokers.stock",
    title: "Tiger Trade",
    summary: "Tiger Brokers stock trading app for global markets.",
    developer: "Tiger Brokers",
    developerId: "Tiger+Brokers",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.tigerbrokers.stock",
  },
  "cn.futu.trader": {
    appId: "cn.futu.trader",
    title: "Futubull",
    summary: "Futu / Futubull trading app.",
    developer: "Futu Holdings",
    developerId: "Futu+Holdings",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=cn.futu.trader",
  },
  "global.longbridge.app.android": {
    appId: "global.longbridge.app.android",
    title: "Longbridge",
    summary: "Longbridge Securities trading app.",
    developer: "Longbridge Securities",
    developerId: "Longbridge+Securities",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=global.longbridge.app.android",
  },
  "com.moomoo.trade": {
    appId: "com.moomoo.trade",
    title: "moomoo",
    summary: "Moomoo trading platform.",
    developer: "Moomoo Inc.",
    developerId: "Moomoo+Inc.",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.moomoo.trade",
  },
};

export function getCuratedSearchAppMeta(appId: string): CuratedSearchAppMeta | null {
  return CURATED_BY_APP_ID[appId.trim().toLowerCase()] ?? null;
}

export function getKnownAppSearchMeta(appId: string): CuratedSearchAppMeta | null {
  const resolved = resolvePlayPackageIdAlias(appId).trim().toLowerCase();
  const curated = getCuratedSearchAppMeta(resolved);
  if (curated) return curated;

  const displayName = getAliasPackageDisplayName(resolved);
  if (!displayName) return null;

  return {
    appId: resolved,
    title: displayName,
    summary: `Android app (${resolved})`,
    developer: "",
    developerId: "",
    iconUrl: "",
    playUrl: `https://play.google.com/store/apps/details?id=${resolved}`,
  };
}

export function buildMinimalFallbackSearchResult(appId: string) {
  const resolved = resolvePlayPackageIdAlias(appId).trim();
  const playUrl = `https://play.google.com/store/apps/details?id=${resolved}`;
  return {
    appId: resolved,
    title: getAliasPackageDisplayName(resolved) ?? resolved,
    summary: null,
    developer: null,
    developerId: null,
    icon: null,
    score: null,
    scoreText: null,
    priceText: null,
    free: true,
    version: null,
    size: null,
    updated: null,
    url: playUrl,
  };
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
