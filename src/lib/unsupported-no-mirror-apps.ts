import noMirrorApps from "./unsupported-no-mirror-apps.json";

export type UnsupportedNoMirrorApp = {
  title: string;
  category?: "vpn" | "unlisted";
  note?: string;
};

const unsupportedNoMirrorApps = noMirrorApps as Record<string, UnsupportedNoMirrorApp>;

export function getUnsupportedNoMirrorApp(appId: string): UnsupportedNoMirrorApp | null {
  return unsupportedNoMirrorApps[appId.trim().toLowerCase()] ?? null;
}

export function isUnsupportedNoMirrorApp(appId: string): boolean {
  return Boolean(getUnsupportedNoMirrorApp(appId));
}
