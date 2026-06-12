import ApkLandingPage from "@/components/ApkLandingPage";
import { tlInstagramApkConfig } from "@/lib/apk-landing/configs/tl-instagram";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(tlInstagramApkConfig);

export default function InstagramApkPage() {
  return <ApkLandingPage config={tlInstagramApkConfig} />;
}
