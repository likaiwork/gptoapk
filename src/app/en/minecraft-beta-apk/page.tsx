import ApkLandingPage from "@/components/ApkLandingPage";
import { enMinecraftBetaApkConfig } from "@/lib/apk-landing/configs/en-minecraft-beta";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(enMinecraftBetaApkConfig);

export default function MinecraftBetaApkPage() {
  return <ApkLandingPage config={enMinecraftBetaApkConfig} />;
}
