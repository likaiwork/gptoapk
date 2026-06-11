import type { ApkLandingConfig } from "./types";

export function getApkLandingCountry(locale: ApkLandingConfig["locale"]): string {
  switch (locale) {
    case "hi":
      return "in";
    case "id":
      return "id";
    case "zh":
      return "cn";
    default:
      return "us";
  }
}

export function buildApkAppPageHref(config: ApkLandingConfig): string {
  const gl = getApkLandingCountry(config.locale);
  const params = new URLSearchParams({ hl: config.locale, gl });
  return `/app/${encodeURIComponent(config.packageName)}?${params.toString()}`;
}
