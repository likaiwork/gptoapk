import delistedApps from "./delisted-apps.json";

export function isApkLandingDelistedApp(packageName: string): boolean {
  return packageName in delistedApps;
}

export function getApkLandingDelistedAppNote(packageName: string): string | undefined {
  const entry = delistedApps[packageName as keyof typeof delistedApps];
  return entry?.note;
}
