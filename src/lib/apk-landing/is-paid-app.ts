import unsupportedPaidApps from "@/lib/unsupported-paid-apps.json";

export function isApkLandingPaidApp(packageName: string): boolean {
  return packageName in unsupportedPaidApps;
}

export function getApkLandingPaidAppNote(packageName: string): string | undefined {
  const entry = unsupportedPaidApps[packageName as keyof typeof unsupportedPaidApps];
  return entry?.note;
}
