import ApkLandingPage from "@/components/ApkLandingPage";
import { hiMinecraftApkConfig } from "@/lib/apk-landing/configs/hi-minecraft";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiMinecraftApkConfig);

export default function MinecraftApkPage() {
  return <ApkLandingPage config={hiMinecraftApkConfig} />;
}
