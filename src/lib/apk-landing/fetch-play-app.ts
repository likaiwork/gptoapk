import { unstable_cache } from "next/cache";
import gplay, { type IAppItemFullDetail } from "google-play-scraper";
import { getApkLandingCountry } from "./build-app-href";
import type { ApkLandingConfig, ApkLandingPlayApp } from "./types";
import { gplayRequestOptions as requestOptions } from "@/lib/proxy";
import { proxyImageUrl } from "@/lib/image-proxy";

const FETCH_TIMEOUT_MS = 8000;
const MAX_SCREENSHOTS = 5;

async function fetchPlayAppRaw(
  appId: string,
  lang: string,
  country: string,
): Promise<ApkLandingPlayApp | null> {
  try {
    const fetchPromise = gplay
      .app({ appId, lang, country, requestOptions } as Parameters<typeof gplay.app>[0])
      .then((res) => res);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Play fetch timeout")), FETCH_TIMEOUT_MS),
    );
    const appInfo = (await Promise.race([fetchPromise, timeoutPromise])) as IAppItemFullDetail;

    return {
      appId: appInfo.appId,
      title: appInfo.title,
      developer: appInfo.developer,
      icon: proxyImageUrl(appInfo.icon),
      scoreText: appInfo.scoreText || null,
      version: appInfo.version || null,
      size: appInfo.size || null,
      updated: appInfo.updated ? new Date(appInfo.updated).toISOString() : null,
      screenshots: (appInfo.screenshots ?? [])
        .slice(0, MAX_SCREENSHOTS)
        .map((url) => proxyImageUrl(url))
        .filter((url): url is string => Boolean(url)),
      available: appInfo.available !== false,
      free: appInfo.free !== false,
    };
  } catch {
    return null;
  }
}

function getPlayLang(locale: ApkLandingConfig["locale"]): string {
  if (locale === "zh") return "zh";
  return locale;
}

export async function fetchApkLandingPlayApp(
  config: ApkLandingConfig,
): Promise<ApkLandingPlayApp | null> {
  const lang = getPlayLang(config.locale);
  const country = getApkLandingCountry(config.locale);
  const cached = unstable_cache(
    () => fetchPlayAppRaw(config.packageName, lang, country),
    ["apk-landing-play", config.packageName, lang, country],
    { revalidate: 86400 },
  );
  return cached();
}

export function buildPlayStoreDetailsHref(
  packageName: string,
  locale: ApkLandingConfig["locale"],
): string {
  const country = getApkLandingCountry(locale);
  const params = new URLSearchParams({ id: packageName, hl: locale, gl: country });
  return `https://play.google.com/store/apps/details?${params.toString()}`;
}

export function buildPlayStoreDataSafetyHref(packageName: string): string {
  return `https://play.google.com/store/apps/datasafety?id=${encodeURIComponent(packageName)}`;
}
