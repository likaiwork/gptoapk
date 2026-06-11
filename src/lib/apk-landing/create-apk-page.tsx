import ApkLandingPage from "@/components/ApkLandingPage";
import { buildApkLandingMetadata } from "@/lib/apk-landing/build-metadata";
import type { ApkLandingConfig } from "@/lib/apk-landing/types";

export function createApkLandingPage(config: ApkLandingConfig) {
  const metadata = buildApkLandingMetadata(config);
  function Page() {
    return <ApkLandingPage config={config} />;
  }
  return { metadata, Page };
}
