import paidApps from "./unsupported-paid-apps.json";

export type UnsupportedPaidApp = {
  title: string;
  sourceUrl?: string;
  note?: string;
};

const unsupportedPaidApps = paidApps as Record<string, UnsupportedPaidApp>;

export function getUnsupportedPaidApp(appId: string): UnsupportedPaidApp | null {
  return unsupportedPaidApps[appId.trim().toLowerCase()] ?? null;
}

export function isUnsupportedPaidApp(appId: string): boolean {
  return Boolean(getUnsupportedPaidApp(appId));
}
