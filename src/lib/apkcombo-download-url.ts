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
    content.matchAll(/https:\/\/[^\s"'<>)\]]*cloudflarestorage\.com[^\s"'<>)\]]*/gi),
  );
  for (const match of directMatches) {
    const directUrl = decodeHtmlAttribute(match[0].replace(/[),.;]+$/, ""));
    if (isAllowedDownloadUrl(directUrl)) return directUrl;
  }

  const r2Href = content.match(/apkcombo\.com\/r2\?u=([^"'\\s<>)\]]+)/i);
  if (r2Href?.[1]) {
    try {
      const decoded = decodeURIComponent(r2Href[1]);
      if (isAllowedDownloadUrl(decoded)) return decoded;
    } catch {
      // ignore
    }
  }

  return null;
}
