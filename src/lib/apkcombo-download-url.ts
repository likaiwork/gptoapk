import { isAllowedDownloadUrl } from "@/lib/download-url-allowlist";

function decodeHtmlAttribute(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function extractApkComboDownloadUrl(content: string): string | null {
  const hrefMatches = Array.from(content.matchAll(/href=["']([^"']*\/r2\?u=[^"']+)["']/g));
  for (const match of hrefMatches) {
    try {
      const href = decodeHtmlAttribute(match[1]);
      const redirectUrl = new URL(href, "https://apkcombo.com");
      const directUrl = redirectUrl.searchParams.get("u");
      if (directUrl && isAllowedDownloadUrl(directUrl)) return directUrl;
    } catch {
      // ignore malformed links
    }
  }

  const directMatches = Array.from(
    content.matchAll(/https:\/\/[^\s"'<>)]*cloudflarestorage\.com[^\s"'<>)]*/g),
  );
  for (const match of directMatches) {
    const directUrl = decodeHtmlAttribute(match[0]);
    if (isAllowedDownloadUrl(directUrl)) return directUrl;
  }

  return null;
}
