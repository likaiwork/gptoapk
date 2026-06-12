import ApkLandingPage from "@/components/ApkLandingPage";
import { enBkashApkConfig } from "@/lib/apk-landing/configs/en-bkash";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";

export const metadata = buildApkLandingMetadata(enBkashApkConfig);

export default function BkashApkPage() {
  return <ApkLandingPage config={enBkashApkConfig} />;
}
