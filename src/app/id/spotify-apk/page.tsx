import ApkLandingPage from "@/components/ApkLandingPage";
import { idSpotifyApkConfig } from "@/lib/apk-landing/configs/id-spotify";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idSpotifyApkConfig);

export default function SpotifyApkPage() {
  return <ApkLandingPage config={idSpotifyApkConfig} />;
}
