import ApkLandingPage from "@/components/ApkLandingPage";
import { hiSnapchatApkConfig } from "@/lib/apk-landing/configs/hi-snapchat";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiSnapchatApkConfig);

export default function SnapchatApkPage() {
  return <ApkLandingPage config={hiSnapchatApkConfig} />;
}
