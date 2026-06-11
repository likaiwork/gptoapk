import ApkLandingPage from "@/components/ApkLandingPage";
import { hiWhatsappApkConfig } from "@/lib/apk-landing/configs/hi-whatsapp";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiWhatsappApkConfig);

export default function WhatsappApkPage() {
  return <ApkLandingPage config={hiWhatsappApkConfig} />;
}
