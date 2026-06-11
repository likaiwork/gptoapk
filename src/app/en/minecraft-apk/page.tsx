import ApkLandingPage from "@/components/ApkLandingPage";
import { enMinecraftApkConfig } from "@/lib/apk-landing/configs/en-minecraft";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(enMinecraftApkConfig);

export default function MinecraftApkPage() {
  return <ApkLandingPage config={enMinecraftApkConfig} />;
}
