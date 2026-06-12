import ApkLandingPage from "@/components/ApkLandingPage";
import { ruByeByeDpiApkConfig } from "@/lib/apk-landing/configs/ru-bye-bye-dpi";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(ruByeByeDpiApkConfig);

export default function ByeByeDpiApkPage() {
  return <ApkLandingPage config={ruByeByeDpiApkConfig} />;
}
