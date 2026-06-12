import ApkLandingPage from "@/components/ApkLandingPage";
import { hiCineTvApkConfig } from "@/lib/apk-landing/configs/hi-cine-tv";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiCineTvApkConfig);

export default function CineTvApkPage() {
  return <ApkLandingPage config={hiCineTvApkConfig} />;
}
