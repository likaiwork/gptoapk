import ApkLandingPage from "@/components/ApkLandingPage";
import { idPubgMobileApkConfig } from "@/lib/apk-landing/configs/id-pubg-mobile";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idPubgMobileApkConfig);

export default function PubgMobileApkPage() {
  return <ApkLandingPage config={idPubgMobileApkConfig} />;
}
