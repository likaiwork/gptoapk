import ApkLandingPage from "@/components/ApkLandingPage";
import { tlWhatsappApkConfig } from "@/lib/apk-landing/configs/tl-whatsapp";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(tlWhatsappApkConfig);

export default function WhatsappApkPage() {
  return <ApkLandingPage config={tlWhatsappApkConfig} />;
}
