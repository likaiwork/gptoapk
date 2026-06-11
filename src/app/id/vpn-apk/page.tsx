import ApkLandingPage from "@/components/ApkLandingPage";
import { idVpnApkConfig } from "@/lib/apk-landing/configs/id-vpn";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(idVpnApkConfig);

export default function VpnApkPage() {
  return <ApkLandingPage config={idVpnApkConfig} />;
}
