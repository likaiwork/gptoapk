import ApkLandingPage from "@/components/ApkLandingPage";
import { tlFreecineApkConfig } from "@/lib/apk-landing/configs/tl-freecine";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(tlFreecineApkConfig);

export default function FreecineApkPage() {
  return <ApkLandingPage config={tlFreecineApkConfig} />;
}
