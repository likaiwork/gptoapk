import ApkLandingPage from "@/components/ApkLandingPage";
import { hiTruecallerApkConfig } from "@/lib/apk-landing/configs/hi-truecaller";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiTruecallerApkConfig);

export default function TruecallerApkPage() {
  return <ApkLandingPage config={hiTruecallerApkConfig} />;
}
