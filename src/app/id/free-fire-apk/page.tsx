import ApkLandingPage from "@/components/ApkLandingPage";
import { idFreeFireApkConfig } from "@/lib/apk-landing/configs/id-free-fire";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idFreeFireApkConfig);

export default function FreeFireApkPage() {
  return <ApkLandingPage config={idFreeFireApkConfig} />;
}
