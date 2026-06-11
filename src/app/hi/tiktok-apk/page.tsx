import ApkLandingPage from "@/components/ApkLandingPage";
import { hiTiktokApkConfig } from "@/lib/apk-landing/configs/hi-tiktok";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiTiktokApkConfig);

export default function TiktokApkPage() {
  return <ApkLandingPage config={hiTiktokApkConfig} />;
}
