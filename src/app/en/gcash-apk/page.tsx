import ApkLandingPage from "@/components/ApkLandingPage";
import { enGcashApkConfig } from "@/lib/apk-landing/configs/en-gcash";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(enGcashApkConfig);

export default function GcashApkPage() {
  return <ApkLandingPage config={enGcashApkConfig} />;
}
