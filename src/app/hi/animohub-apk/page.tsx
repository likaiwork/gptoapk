import ApkLandingPage from "@/components/ApkLandingPage";
import { hiAnimohubApkConfig } from "@/lib/apk-landing/configs/hi-animohub";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiAnimohubApkConfig);

export default function AnimohubApkPage() {
  return <ApkLandingPage config={hiAnimohubApkConfig} />;
}
