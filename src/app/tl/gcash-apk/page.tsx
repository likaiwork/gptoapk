import ApkLandingPage from "@/components/ApkLandingPage";
import { tlGcashApkConfig } from "@/lib/apk-landing/configs/tl-gcash";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(tlGcashApkConfig);

export default function GcashApkPage() {
  return <ApkLandingPage config={tlGcashApkConfig} />;
}
