import ApkLandingPage from "@/components/ApkLandingPage";
import { hiCapcutApkConfig } from "@/lib/apk-landing/configs/hi-capcut";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiCapcutApkConfig);

export default function CapcutApkPage() {
  return <ApkLandingPage config={hiCapcutApkConfig} />;
}
