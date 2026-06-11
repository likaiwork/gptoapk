import ApkLandingPage from "@/components/ApkLandingPage";
import { hiCocoboxApkConfig } from "@/lib/apk-landing/configs/hi-cocobox";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiCocoboxApkConfig);

export default function CocoboxApkPage() {
  return <ApkLandingPage config={hiCocoboxApkConfig} />;
}
