import ApkLandingPage from "@/components/ApkLandingPage";
import { hiInstagramApkConfig } from "@/lib/apk-landing/configs/hi-instagram";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiInstagramApkConfig);

export default function InstagramApkPage() {
  return <ApkLandingPage config={hiInstagramApkConfig} />;
}
