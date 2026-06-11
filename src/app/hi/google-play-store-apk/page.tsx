import ApkLandingPage from "@/components/ApkLandingPage";
import { hiGooglePlayStoreApkConfig } from "@/lib/apk-landing/configs/hi-google-play-store";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiGooglePlayStoreApkConfig);

export default function GooglePlayStoreApkPage() {
  return <ApkLandingPage config={hiGooglePlayStoreApkConfig} />;
}
