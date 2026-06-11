import ApkLandingPage from "@/components/ApkLandingPage";
import { idTiktokApkConfig } from "@/lib/apk-landing/configs/id-tiktok";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idTiktokApkConfig);

export default function TiktokApkPage() {
  return <ApkLandingPage config={idTiktokApkConfig} />;
}
