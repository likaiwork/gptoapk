import ApkLandingPage from "@/components/ApkLandingPage";
import { hiFreecineApkConfig } from "@/lib/apk-landing/configs/hi-freecine";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiFreecineApkConfig);

export default function FreecineApkPage() {
  return <ApkLandingPage config={hiFreecineApkConfig} />;
}
