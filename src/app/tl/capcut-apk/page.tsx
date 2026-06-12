import ApkLandingPage from "@/components/ApkLandingPage";
import { tlCapcutApkConfig } from "@/lib/apk-landing/configs/tl-capcut";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(tlCapcutApkConfig);

export default function CapcutApkPage() {
  return <ApkLandingPage config={tlCapcutApkConfig} />;
}
