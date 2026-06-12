import ApkLandingPage from "@/components/ApkLandingPage";
import { idYoutubeApkConfig } from "@/lib/apk-landing/configs/id-youtube";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idYoutubeApkConfig);

export default function YoutubeApkPage() {
  return <ApkLandingPage config={idYoutubeApkConfig} />;
}
