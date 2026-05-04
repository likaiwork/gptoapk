import * as cheerio from 'cheerio';

export interface ApkVariant {
  type: 'APK' | 'XAPK';
  /** Real upstream URL (base64-decoded). May be CF-protected if hit directly. */
  realUrl: string;
  /** APKCombo wrapper URL — feed this to the browser; user agent's JS engine
   *  will follow the redirect and pass the Cloudflare challenge automatically. */
  wrapperUrl: string;
  filename?: string;
}

const BROWSER_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
};

function decodeFilename(realUrl: string): string | undefined {
  const m = realUrl.match(/[?&]_fn=([^&]+)/);
  if (!m) return undefined;
  try {
    return Buffer.from(decodeURIComponent(m[1]), 'base64').toString('utf-8');
  } catch {
    return undefined;
  }
}

function parseVariants(html: string): ApkVariant[] {
  const $ = cheerio.load(html);
  const variants: ApkVariant[] = [];

  $('a.variant').each((_, el) => {
    const href = $(el).attr('href') || '';
    const m = href.match(/[?&]u=([^&]+)/);
    if (!m) return;

    let realUrl: string;
    try {
      realUrl = Buffer.from(decodeURIComponent(m[1]), 'base64').toString('utf-8');
    } catch {
      return;
    }

    const isXapk = /\/b\/XAPK\//.test(realUrl);
    variants.push({
      type: isXapk ? 'XAPK' : 'APK',
      realUrl,
      wrapperUrl: href,
      filename: decodeFilename(realUrl),
    });
  });

  return variants;
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchApkVariants(packageName: string): Promise<ApkVariant[]> {
  // Step 1: hit /x/{pkg}/... — APKCombo redirects to /{slug}/{pkg}/download/apk.
  // The HTML is just a skeleton; the variant list is fetched client-side via XHR.
  const skeletonUrl = `https://apkcombo.com/x/${packageName}/download/apk`;
  const skeletonRes = await fetchWithTimeout(
    skeletonUrl,
    { headers: BROWSER_HEADERS, redirect: 'follow' },
    20000,
  );
  if (!skeletonRes.ok) {
    throw new Error(`Skeleton page returned ${skeletonRes.status}`);
  }
  const skeletonHtml = await skeletonRes.text();
  const finalUrl = skeletonRes.url;

  // Inline pass: in case APKCombo ever inlines variants again.
  const inline = parseVariants(skeletonHtml);
  if (inline.length > 0) return inline;

  // Step 2: replicate the page's XHR call to /{slug}/{pkg}/{xid}/dl.
  // The slug comes from the redirected URL; xid is hardcoded in a <script>.
  const slugMatch = finalUrl.match(/^https?:\/\/apkcombo\.com\/([^/]+)\/[^/]+\/download\/apk/);
  if (!slugMatch) return [];
  const slug = slugMatch[1];

  const xidMatch = skeletonHtml.match(/var\s+xid\s*=\s*"([^"]+)"/);
  if (!xidMatch) return [];
  const xid = xidMatch[1];

  const dlUrl = `https://apkcombo.com/${slug}/${packageName}/${xid}/dl`;
  const form = new URLSearchParams({ package_name: packageName, version: '' });

  const dlRes = await fetchWithTimeout(
    dlUrl,
    {
      method: 'POST',
      headers: {
        ...BROWSER_HEADERS,
        Referer: finalUrl,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form.toString(),
    },
    25000,
  );
  if (!dlRes.ok) {
    throw new Error(`XHR /dl returned ${dlRes.status}`);
  }
  const dlBody = await dlRes.text();

  return parseVariants(dlBody);
}

/** Pick the best variant: prefer plain APK over XAPK (XAPK contains OBB and
 *  needs a separate installer; plain APK is one file users can sideload). */
export function pickBestVariant(variants: ApkVariant[]): ApkVariant | undefined {
  return variants.find((v) => v.type === 'APK') || variants[0];
}
