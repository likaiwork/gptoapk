import ApkLandingPage from "@/components/ApkLandingPage";
import { hiVpnApkConfig } from "@/lib/apk-landing/configs/hi-vpn";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(hiVpnApkConfig);

export default function VpnApkPage() {
  return <ApkLandingPage config={hiVpnApkConfig} />;
}
