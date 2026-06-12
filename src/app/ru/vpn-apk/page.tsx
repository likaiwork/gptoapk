import ApkLandingPage from "@/components/ApkLandingPage";
import { ruVpnApkConfig } from "@/lib/apk-landing/configs/ru-vpn";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(ruVpnApkConfig);

export default function VpnApkPage() {
  return <ApkLandingPage config={ruVpnApkConfig} />;
}
