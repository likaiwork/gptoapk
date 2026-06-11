import ApkLandingPage from "@/components/ApkLandingPage";
import { hiPubgMobileApkConfig } from "@/lib/apk-landing/configs/hi-pubg-mobile";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiPubgMobileApkConfig);

export default function PubgMobileApkPage() {
  return <ApkLandingPage config={hiPubgMobileApkConfig} />;
}
