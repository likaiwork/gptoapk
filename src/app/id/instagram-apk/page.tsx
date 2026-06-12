import ApkLandingPage from "@/components/ApkLandingPage";
import { idInstagramApkConfig } from "@/lib/apk-landing/configs/id-instagram";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idInstagramApkConfig);

export default function InstagramApkPage() {
  return <ApkLandingPage config={idInstagramApkConfig} />;
}
