/** Strip invisible Unicode and whitespace from pasted package names. */
export function sanitizeAppId(appId: string): string {
  return appId
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .trim();
}
