import ApkLandingPage from "@/components/ApkLandingPage";
import { idTelegramApkConfig } from "@/lib/apk-landing/configs/id-telegram";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idTelegramApkConfig);

export default function TelegramApkPage() {
  return <ApkLandingPage config={idTelegramApkConfig} />;
}
