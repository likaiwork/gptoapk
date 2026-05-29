import noMirrorApps from "./unsupported-no-mirror-apps.json";

export type UnsupportedNoMirrorApp = {
  title: string;
  category?: "vpn" | "unlisted";
  note?: string;
};

const unsupportedNoMirrorApps = noMirrorApps as Record<string, UnsupportedNoMirrorApp>;

const unsupportedNoMirrorByLowercase = Object.fromEntries(
  Object.entries(unsupportedNoMirrorApps).map(([appId, app]) => [appId.toLowerCase(), app]),
) as Record<string, UnsupportedNoMirrorApp>;

export function getUnsupportedNoMirrorApp(appId: string): UnsupportedNoMirrorApp | null {
  return unsupportedNoMirrorByLowercase[appId.trim().toLowerCase()] ?? null;
}

export function isUnsupportedNoMirrorApp(appId: string): boolean {
  return Boolean(getUnsupportedNoMirrorApp(appId));
}

export function getUnsupportedNoMirrorAppsByCategory(
  category: UnsupportedNoMirrorApp["category"],
): Array<{ appId: string; title: string; category?: UnsupportedNoMirrorApp["category"]; note?: string }> {
  const out: Array<{ appId: string; title: string; category?: UnsupportedNoMirrorApp["category"]; note?: string }> = [];
  for (const [appId, app] of Object.entries(unsupportedNoMirrorApps)) {
    if (!category) {
      out.push({ appId, title: app.title, category: app.category, note: app.note });
      continue;
    }
    if (app.category === category) {
      out.push({ appId, title: app.title, category: app.category, note: app.note });
    }
  }
  return out;
}
