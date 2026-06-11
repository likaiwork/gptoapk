import ApkLandingPage from "@/components/ApkLandingPage";
import { hiSpotifyApkConfig } from "@/lib/apk-landing/configs/hi-spotify";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiSpotifyApkConfig);

export default function SpotifyApkPage() {
  return <ApkLandingPage config={hiSpotifyApkConfig} />;
}
