import ApkLandingPage from "@/components/ApkLandingPage";
import { idKinemasterApkConfig } from "@/lib/apk-landing/configs/id-kinemaster";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idKinemasterApkConfig);

export default function KinemasterApkPage() {
  return <ApkLandingPage config={idKinemasterApkConfig} />;
}
