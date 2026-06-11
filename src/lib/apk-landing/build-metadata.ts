import type { Metadata } from "next";
import type { ApkLandingConfig } from "./types";

const SITE = "https://www.gptoapk.com";

/** Appteka-style: Download {App} APK v{version} for Android · gptoapk */
export function buildApkLandingTitle(config: ApkLandingConfig): string {
  if (config.title) return config.title;
  const name = config.variantLabel
    ? `${config.appName} (${config.variantLabel})`
    : config.appName;
  return `Download ${name} APK v${config.version} for Android | gptoapk`;
}

export function buildApkLandingDescription(config: ApkLandingConfig): string {
  if (config.description) return config.description;
  const name = config.variantLabel
    ? `${config.appName} (${config.variantLabel})`
    : config.appName;
  return `Download ${name} APK for Android. Package ${config.packageName}. ${config.minAndroid}. Free APK from Google Play sources via gptoapk.`;
}

export function buildApkLandingCanonical(config: ApkLandingConfig): string {
  return `${SITE}/${config.locale}/${config.slug}`;
}

export function buildApkLandingMetadata(config: ApkLandingConfig): Metadata {
  return {
    title: buildApkLandingTitle(config),
    description: buildApkLandingDescription(config),
    keywords: config.keywords,
    alternates: {
      canonical: buildApkLandingCanonical(config),
    },
  };
}

export function buildApkLandingH1(config: ApkLandingConfig): string {
  const name = config.variantLabel
    ? `${config.appName} (${config.variantLabel})`
    : config.appName;
  switch (config.locale) {
    case "hi":
      return `${name} APK डाउनलोड करें Android के लिए`;
    case "id":
      return `Download ${name} APK untuk Android`;
    case "zh":
      return `${name} APK 下载安装教程`;
    default:
      return `Download ${name} APK for Android`;
  }
}
