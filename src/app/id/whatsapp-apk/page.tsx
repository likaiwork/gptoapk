import ApkLandingPage from "@/components/ApkLandingPage";
import { idWhatsappApkConfig } from "@/lib/apk-landing/configs/id-whatsapp";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idWhatsappApkConfig);

export default function WhatsappApkPage() {
  return <ApkLandingPage config={idWhatsappApkConfig} />;
}
