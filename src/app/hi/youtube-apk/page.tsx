import ApkLandingPage from "@/components/ApkLandingPage";
import { hiYoutubeApkConfig } from "@/lib/apk-landing/configs/hi-youtube";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiYoutubeApkConfig);

export default function YoutubeApkPage() {
  return <ApkLandingPage config={hiYoutubeApkConfig} />;
}
