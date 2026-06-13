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
  "com.grindrapp.android": {
    appId: "com.grindrapp.android",
    title: "Grindr",
    summary: "Social networking app for the LGBTQ+ community.",
    developer: "Grindr LLC",
    developerId: "Grindr+LLC",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.grindrapp.android",
  },
  "org.localsend.localsend_app": {
    appId: "org.localsend.localsend_app",
    title: "LocalSend",
    summary: "Share files to nearby devices on your local network.",
    developer: "Tien Do Nam",
    developerId: "Tien+Do+Nam",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=org.localsend.localsend_app",
  },
  "com.wx.freecine": {
    appId: "com.wx.freecine",
    title: "Freecine Filmes e Séries",
    summary: "Lightweight video player for your own media files.",
    developer: "Walpapers zero",
    developerId: "Walpapers+zero",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.wx.freecine",
  },
  "com.cinefffflix.com": {
    appId: "com.cinefffflix.com",
    title: "CINE TV",
    summary: "Media player for high-quality video playback.",
    developer: "Heinsenberg Dev",
    developerId: "Heinsenberg+Dev",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.cinefffflix.com",
  },
  "com.bkash.customerapp": {
    appId: "com.bkash.customerapp",
    title: "bKash",
    summary: "Mobile financial services app for Bangladesh.",
    developer: "bKash Limited",
    developerId: "bKash+Limited",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.bkash.customerapp",
  },
  "com.winlator": {
    appId: "com.winlator",
    title: "Winlator",
    summary: "Run Windows games and apps on Android via Wine/Box64.",
    developer: "Winlator",
    developerId: "Winlator",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.winlator",
  },
  "io.github.romanvht.byedpi": {
    appId: "io.github.romanvht.byedpi",
    title: "ByeByeDPI",
    summary: "Local DPI bypass tool for Android (open-source fork).",
    developer: "romanvht",
    developerId: "romanvht",
    iconUrl: "",
    playUrl: "https://github.com/romanvht/ByeByeDPI",
  },
  "com.truecaller": {
    appId: "com.truecaller",
    title: "Truecaller",
    summary: "Caller ID, spam blocking, and messaging.",
    developer: "Truecaller International LLP",
    developerId: "Truecaller+International+LLP",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.truecaller",
  },
  "com.snapchat.android": {
    appId: "com.snapchat.android",
    title: "Snapchat",
    summary: "Share moments with friends through photos and videos.",
    developer: "Snap Inc",
    developerId: "Snap+Inc",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.snapchat.android",
  },
  "com.animohub.pro": {
    appId: "com.animohub.pro",
    title: "AnimoHub",
    summary: "Anime and entertainment streaming app.",
    developer: "AnimoHub",
    developerId: "AnimoHub",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.animohub.pro",
  },
  "com.globe.gcash.android": {
    appId: "com.globe.gcash.android",
    title: "GCash",
    summary: "Philippines mobile wallet — send money, pay bills, scan QR.",
    developer: "Mynt - Globe Fintech Innovations, Inc.",
    developerId: "Mynt+-+Globe+Fintech+Innovations,+Inc.",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.globe.gcash.android",
  },
  "com.mojang.minecraftpreview": {
    appId: "com.mojang.minecraftpreview",
    title: "Minecraft Preview",
    summary: "Official Minecraft beta/preview builds for Android.",
    developer: "Mojang",
    developerId: "Mojang",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.mojang.minecraftpreview",
  },
  "com.scee.psx.android": {
    appId: "com.scee.psx.android",
    title: "PlayStation App",
    summary: "Connect to your PlayStation console and manage games.",
    developer: "PlayStation Mobile Inc.",
    developerId: "PlayStation+Mobile+Inc.",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.scee.psx.android",
  },
  "com.teamspeak.ts3client": {
    appId: "com.teamspeak.ts3client",
    title: "TeamSpeak 3",
    summary: "Voice chat for gaming and teams.",
    developer: "TeamSpeak Systems GmbH",
    developerId: "TeamSpeak+Systems+GmbH",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.teamspeak.ts3client",
  },
  "com.asxkkc.jbz": {
    appId: "com.asxkkc.jbz",
    title: "星影视频",
    summary: "Free video streaming app.",
    developer: "",
    developerId: "",
    iconUrl: "",
    playUrl: "https://play.google.com/store/apps/details?id=com.asxkkc.jbz",
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
