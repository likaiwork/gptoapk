import ApkLandingPage from "@/components/ApkLandingPage";
import { idCapcutApkConfig } from "@/lib/apk-landing/configs/id-capcut";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idCapcutApkConfig);

export default function CapcutApkPage() {
  return <ApkLandingPage config={idCapcutApkConfig} />;
}
