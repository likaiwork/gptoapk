export const ALLOWED_DOWNLOAD_HOST_SUFFIXES = [
  ".aptoide.com",
  ".winudf.com",
  ".apkpure.com",
  ".apppure.net",
  ".pureapk.com",
  ".cloudflarestorage.com",
  ".online-apk-downloader.com",
  ".amazonaws.com",
  ".r2.cloudflarestorage.com",
] as const;

export function isAllowedDownloadUrl(downloadUrl: string): boolean {
  try {
    const parsed = new URL(downloadUrl);
    if (parsed.protocol !== "https:") return false;
    return ALLOWED_DOWNLOAD_HOST_SUFFIXES.some(
      (suffix) => parsed.hostname.endsWith(suffix) || parsed.hostname === suffix.slice(1),
    );
  } catch {
    return false;
  }
}
