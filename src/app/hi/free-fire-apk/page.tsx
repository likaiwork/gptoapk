import ApkLandingPage from "@/components/ApkLandingPage";
import { hiFreeFireApkConfig } from "@/lib/apk-landing/configs/hi-free-fire";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiFreeFireApkConfig);

export default function FreeFireApkPage() {
  return <ApkLandingPage config={hiFreeFireApkConfig} />;
}
