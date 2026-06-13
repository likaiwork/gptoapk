import gplay, { type IAppItemFullDetail } from "google-play-scraper";
import { gplayRequestOptions as requestOptions } from "@/lib/proxy";
import { proxyImageUrl } from "@/lib/image-proxy";
import {
  buildCuratedSearchResult,
  buildMinimalFallbackSearchResult,
  getKnownAppSearchMeta,
} from "@/lib/curated-search-apps";
import { resolvePlayPackageIdAlias } from "@/lib/search-aliases";

const FETCH_TIMEOUT_MS = 12_000;

export type AppDetailView = {
  appId: string;
  title: string;
  developer: string;
  developerWebsite: string | null;
  icon: string | null;
  summary: string | null;
  description: string | null;
  descriptionHTML: string | null;
  version: string | null;
  size: string | null;
  updated: number | null;
  free: boolean;
  priceText: string | null;
  androidVersionText: string | null;
  androidVersion: string | null;
  genre: string | null;
  available: boolean;
  currency: string | null;
  scoreText: string | null;
};

function toAppDetailView(app: IAppItemFullDetail): AppDetailView {
  return {
    appId: app.appId,
    title: app.title,
    developer: app.developer || "",
    developerWebsite: app.developerWebsite || null,
    icon: proxyImageUrl(app.icon),
    summary: app.summary || null,
    description: app.description || null,
    descriptionHTML: app.descriptionHTML || null,
    version: app.version || null,
    size: app.size || null,
    updated: typeof app.updated === "number" ? app.updated : null,
    free: app.free !== false,
    priceText: app.priceText || null,
    androidVersionText: app.androidVersionText || null,
    androidVersion: app.androidVersion || null,
    genre: app.genre || null,
    available: app.available !== false,
    currency: app.currency || null,
    scoreText: app.scoreText || null,
  };
}

function curatedFallbackToView(appId: string): AppDetailView {
  const resolved = resolvePlayPackageIdAlias(appId);
  const meta = getKnownAppSearchMeta(resolved);
  if (meta) {
    const curated = buildCuratedSearchResult(meta);
    return {
      appId: curated.appId,
      title: curated.title,
      developer: curated.developer || "",
      developerWebsite: null,
      icon: curated.icon,
      summary: curated.summary,
      description: curated.summary,
      descriptionHTML: null,
      version: curated.version,
      size: curated.size,
      updated: null,
      free: curated.free !== false,
      priceText: curated.priceText,
      androidVersionText: null,
      androidVersion: null,
      genre: null,
      available: true,
      currency: null,
      scoreText: curated.scoreText,
    };
  }

  const minimal = buildMinimalFallbackSearchResult(resolved);
  return {
    appId: minimal.appId,
    title: minimal.title,
    developer: minimal.developer || "",
    developerWebsite: null,
    icon: minimal.icon,
    summary: minimal.summary,
    description: minimal.summary,
    descriptionHTML: null,
    version: minimal.version,
    size: minimal.size,
    updated: null,
    free: minimal.free !== false,
    priceText: minimal.priceText,
    androidVersionText: null,
    androidVersion: null,
    genre: null,
    available: true,
    currency: null,
    scoreText: minimal.scoreText,
  };
}

function localeFetchAttempts(lang: string, country: string): Array<{ lang: string; country: string }> {
  const attempts: Array<{ lang: string; country: string }> = [{ lang, country }];
  const seen = new Set([`${lang}:${country}`]);

  const add = (nextLang: string, nextCountry: string) => {
    const key = `${nextLang}:${nextCountry}`;
    if (seen.has(key)) return;
    seen.add(key);
    attempts.push({ lang: nextLang, country: nextCountry });
  };

  if (lang === "zh" || country === "cn") {
    add("zh", "cn");
    add("zh", "hk");
    add("zh", "tw");
  }
  add("en", "us");

  return attempts;
}

async function fetchFromPlayStore(
  appId: string,
  lang: string,
  country: string,
): Promise<IAppItemFullDetail | null> {
  try {
    const fetchPromise = gplay.app({
      appId,
      lang,
      country,
      requestOptions,
    } as Parameters<typeof gplay.app>[0]);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Play fetch timeout")), FETCH_TIMEOUT_MS),
    );
    return (await Promise.race([fetchPromise, timeoutPromise])) as IAppItemFullDetail;
  } catch {
    return null;
  }
}

/** Fetch app metadata for /app/[appId] pages; never throws — uses curated fallback when Play is unavailable. */
export async function fetchAppDetailForPage(
  appId: string,
  lang: string,
  country: string,
): Promise<AppDetailView> {
  const resolvedAppId = resolvePlayPackageIdAlias(appId);

  for (const attempt of localeFetchAttempts(lang, country)) {
    const appInfo = await fetchFromPlayStore(resolvedAppId, attempt.lang, attempt.country);
    if (appInfo?.appId) return toAppDetailView(appInfo);
  }

  return curatedFallbackToView(resolvedAppId);
}
