import ApkLandingPage from "@/components/ApkLandingPage";
import { hiWinlatorApkConfig } from "@/lib/apk-landing/configs/hi-winlator";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiWinlatorApkConfig);

export default function WinlatorApkPage() {
  return <ApkLandingPage config={hiWinlatorApkConfig} />;
}
