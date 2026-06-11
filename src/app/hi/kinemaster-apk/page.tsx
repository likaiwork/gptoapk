import ApkLandingPage from "@/components/ApkLandingPage";
import { hiKinemasterApkConfig } from "@/lib/apk-landing/configs/hi-kinemaster";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiKinemasterApkConfig);

export default function KinemasterApkPage() {
  return <ApkLandingPage config={hiKinemasterApkConfig} />;
}
