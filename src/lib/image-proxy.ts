const IMAGE_PROXY_PATH = "/api/image";

export function proxyImageUrl(url: string | null | undefined) {
  if (!url) return null;

  if (url.startsWith(IMAGE_PROXY_PATH)) {
    return url;
  }

  if (!/^https:\/\//i.test(url)) {
    return url;
  }

  return `${IMAGE_PROXY_PATH}?u=${encodeURIComponent(url)}`;
}
