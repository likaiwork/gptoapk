import ApkLandingPage from "@/components/ApkLandingPage";
import { hiTelegramApkConfig } from "@/lib/apk-landing/configs/hi-telegram";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiTelegramApkConfig);

export default function TelegramApkPage() {
  return <ApkLandingPage config={hiTelegramApkConfig} />;
}
