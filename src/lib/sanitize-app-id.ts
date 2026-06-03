import { resolvePlayPackageIdAlias } from "@/lib/search-aliases";

/** Strip invisible Unicode and whitespace from pasted package names. */
export function sanitizeAppId(appId: string): string {
  let id = appId
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .trim();
  if (/\.apk$/i.test(id)) {
    id = id.replace(/\.apk$/i, "");
  }
  return resolvePlayPackageIdAlias(id);
}
