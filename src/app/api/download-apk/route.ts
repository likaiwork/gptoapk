import { NextResponse } from 'next/server';
import { getManualDownloadSource, initDatabase, logDownload } from '@/lib/db';
import {
  getMirrorUnavailableMessage,
  getPaidAppUnsupportedMessage,
  localeFromAcceptLanguage,
  normalizeDownloadLocale,
  MIRROR_UNAVAILABLE_ADMIN_ERROR,
  MIRROR_UNAVAILABLE_CODE,
  PAID_APP_UNSUPPORTED_ADMIN_ERROR,
  PAID_APP_UNSUPPORTED_CODE,
} from '@/lib/download-errors';
import { fetchDispatcher } from '@/lib/proxy';
import { analyticsEvents, trackServerEvent } from '@/lib/server-analytics';
import { getUnsupportedNoMirrorApp } from '@/lib/unsupported-no-mirror-apps';
import { getUnsupportedPaidApp } from '@/lib/unsupported-paid-apps';
import { resolveApkComboAppDownloadUrl } from '@/lib/apkcombo-app-download';
import { fetchApkPureCmsDownloadUrl } from '@/lib/apkpure-cms-download';
import { resolveUptodownDownloadUrl } from '@/lib/uptodown-download';
import { isAllowedDownloadUrl as isAllowedDownloadUrlShared } from '@/lib/download-url-allowlist';
import { sanitizeAppId } from '@/lib/sanitize-app-id';

export const runtime = 'nodejs';
export const maxDuration = 300;

const SOURCE_TIMEOUT_MS = Number(process.env.APK_SOURCE_TIMEOUT_MS ?? 12000);
const APKCOMBO_TIMEOUT_MS = Number(process.env.APKCOMBO_TIMEOUT_MS ?? 25000);
const CHINESE_RETAIL_TIMEOUT_MS = Number(process.env.CHINESE_APK_TIMEOUT_MS ?? 45000);
const ONLINE_APK_DOWNLOADER_TIMEOUT_MS = Number(process.env.ONLINE_APK_DOWNLOADER_TIMEOUT_MS ?? 30000);
const STREAM_TIMEOUT_MS = Number(process.env.APK_STREAM_TIMEOUT_MS ?? 280000);
const MAX_PROXY_BYTES = Number(process.env.APK_PROXY_MAX_BYTES ?? 1024 * 1024 * 1024);
const USER_AGENT = 'Mozilla/5.0 (compatible; gptoapk/1.0; +https://www.gptoapk.com)';
const APK_CONTENT_TYPE = 'application/vnd.android.package-archive';
const DOWNLOAD_CACHE_CONTROL = 'no-store';

const ALLOWED_DOWNLOAD_HOST_SUFFIXES = [
  '.aptoide.com',
  '.winudf.com',
  '.apkpure.com',
  '.apppure.net',
  '.cloudflarestorage.com',
  '.online-apk-downloader.com',
  '.amazonaws.com',
  '.r2.cloudflarestorage.com',
  '.uptodown.com',
];
const APKCOMBO_SOURCE_PAGES: Record<string, { pageUrl: string; fileName: string; type: string }> = {
  'com.anthropic.claude': {
    pageUrl: 'https://apkcombo.com/claude-by-anthropic/com.anthropic.claude/download/apk',
    fileName: 'Claude by Anthropic.xapk',
    type: 'XAPK',
  },
  'com.openai.chatgpt': {
    pageUrl: 'https://apkcombo.com/chatgpt/com.openai.chatgpt/download/apk',
    fileName: 'ChatGPT.apk',
    type: 'APK',
  },
  'org.telegram.messenger': {
    pageUrl: 'https://apkcombo.com/telegram/org.telegram.messenger/download/apk',
    fileName: 'Telegram.apk',
    type: 'APK',
  },
  'com.instagram.android': {
    pageUrl: 'https://apkcombo.com/instagram/com.instagram.android/download/apk',
    fileName: 'Instagram.apk',
    type: 'APK',
  },
  'com.google.android.youtube': {
    pageUrl: 'https://apkcombo.com/youtube/com.google.android.youtube/download/apk',
    fileName: 'YouTube.apk',
    type: 'APK',
  },
  'com.whatsapp': {
    pageUrl: 'https://apkcombo.com/whatsapp/com.whatsapp/download/apk',
    fileName: 'WhatsApp.apk',
    type: 'APK',
  },
  'com.kwai.video': {
    pageUrl: 'https://apkcombo.com/kwai/com.kwai.video/download/apk',
    fileName: 'Kwai.apk',
    type: 'APK',
  },
  'com.smile.gifmaker': {
    pageUrl: 'https://apkcombo.com/kuaishou/com.smile.gifmaker/download/apk',
    fileName: 'Kuaishou.apk',
    type: 'APK',
  },
  'com.adobe.lrmobile': {
    pageUrl: 'https://apkcombo.com/adobe-lightroom/com.adobe.lrmobile/download/apk',
    fileName: 'Adobe Lightroom.apk',
    type: 'APK',
  },
  'com.schwab.mobile': {
    pageUrl: 'https://apkcombo.com/schwab-mobile/com.schwab.mobile/download/apk',
    fileName: 'Schwab Mobile.apk',
    type: 'APK',
  },
  'com.VCB': {
    pageUrl: 'https://apkcombo.com/vcb-digibank/com.VCB/download/apk',
    fileName: 'VCB Digibank.apk',
    type: 'APK',
  },
  'cloud.centaur.gojgp': {
    pageUrl: 'https://apkcombo.com/gojgp/cloud.centaur.gojgp/download/apk',
    fileName: '狗急加速VPN.apk',
    type: 'APK',
  },
  'com.sticktoit': {
    pageUrl: 'https://apkcombo.com/wang-vpn-fast-secure-vpn/com.sticktoit/download/apk',
    fileName: '老王VPN.apk',
    type: 'APK',
  },
  'com.taobao.taobao': {
    pageUrl: 'https://apkcombo.com/taobao/com.taobao.taobao/download/apk',
    fileName: 'Taobao.apk',
    type: 'APK',
  },
  'com.xunmeng.pinduoduo': {
    pageUrl: 'https://apkcombo.com/pinduoduo/com.xunmeng.pinduoduo/download/apk',
    fileName: 'Pinduoduo.apk',
    type: 'APK',
  },
  'com.netshort.abroad': {
    pageUrl: 'https://apkcombo.com/netshort/com.netshort.abroad/download/apk',
    fileName: 'NetShort.apk',
    type: 'APK',
  },
  'com.jingdong.app.mall': {
    pageUrl: 'https://apkcombo.com/jd-com-jingdong/com.jingdong.app.mall/download/apk',
    fileName: 'JD.apk',
    type: 'APK',
  },
  'com.biyaglobal.www': {
    pageUrl: 'https://apkcombo.com/biyapay/com.BIYAGlobal.www/download/apk',
    fileName: 'BiyaPay.apk',
    type: 'APK',
  },
  'org.readera': {
    pageUrl: 'https://apkcombo.com/readera/org.readera/download/apk',
    fileName: 'ReadEra.apk',
    type: 'APK',
  },
  'com.minitech.miniworld': {
    pageUrl: 'https://apkcombo.com/mini-world/com.minitech.miniworld/download/apk',
    fileName: 'Mini World.apk',
    type: 'APK',
  },
  'com.fds.infiniteflight': {
    pageUrl: 'https://apkcombo.com/infinite-flight/com.fds.infiniteflight/download/apk',
    fileName: 'Infinite Flight.apk',
    type: 'APK',
  },
  'jp.softether.vpngate': {
    pageUrl: 'https://apkcombo.com/vpn-gate-client/jp.softether.vpngate/download/apk',
    fileName: 'VPN Gate Client.apk',
    type: 'APK',
  },
  'com.vuuu.tinyterraces': {
    pageUrl: 'https://apkcombo.com/tiny-terraces/com.VuVuu.TinyTerraces/download/apk',
    fileName: 'Tiny Terraces.apk',
    type: 'APK',
  },
  'com.netease.partyglobal': {
    pageUrl: 'https://apkcombo.com/eggy-party/com.netease.partyglobal/download/apk',
    fileName: 'Eggy Party.apk',
    type: 'APK',
  },
  'com.avast.android.mobilesecurity': {
    pageUrl: 'https://apkcombo.com/avast/com.avast.android.mobilesecurity/download/apk',
    fileName: 'Avast.apk',
    type: 'APK',
  },
  'com.musicgpt.app.android': {
    pageUrl: 'https://apkcombo.com/musicgpt-ai-song-generator/com.musicgpt.app.android/download/apk',
    fileName: 'MusicGPT.apk',
    type: 'APK',
  },
  'com.grafana.oncall.prod': {
    pageUrl: 'https://apkcombo.com/grafana-irm/com.grafana.oncall.prod/download/apk',
    fileName: 'Grafana IRM.apk',
    type: 'APK',
  },
};
const ONLINE_APK_DOWNLOADER_PACKAGE_OVERRIDES: Record<string, { fileName: string; type: string }> = {
  'com.anthropic.claude': {
    fileName: 'Claude by Anthropic.apk',
    type: 'APK',
  },
};

type SourceResult = {
  downloadUrl: string;
  fileName: string | null;
  version: string | null;
  size: number | null;
  md5: string | null;
  source: string;
  externalPage?: boolean;
  type?: string;
  preferredDelivery?: 'direct' | 'proxy';
  trustedManual?: boolean;
};

type AptoideResponse = {
  data?: {
    file?: {
      path?: string;
      path_alt?: string;
      vername?: string;
      filesize?: number;
      md5sum?: string;
    };
  };
};

type OnlineApkDownloaderResponse = {
  success?: boolean;
  downloadUrl?: string;
  package?: string;
};

function fetchWithProxy(input: string, init: RequestInit = {}) {
  return fetch(input, {
    ...init,
    // Native fetch does not expose undici's proxy dispatcher type.
    ...(fetchDispatcher ? { dispatcher: fetchDispatcher } : {}),
  } as RequestInit & { dispatcher?: typeof fetchDispatcher });
}

function createAbortSignal(timeoutMs: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return {
    signal: controller.signal,
    abort: () => controller.abort(),
    clear: () => clearTimeout(timer),
  };
}

function isAllowedDownloadUrl(downloadUrl: string) {
  if (isAllowedDownloadUrlShared(downloadUrl)) return true;
  try {
    const parsed = new URL(downloadUrl);
    if (parsed.protocol !== 'https:') return false;
    return ALLOWED_DOWNLOAD_HOST_SUFFIXES.some(
      (suffix) => parsed.hostname.endsWith(suffix) || parsed.hostname === suffix.slice(1)
    );
  } catch {
    return false;
  }
}

function isPublicHttpsUrl(downloadUrl: string) {
  try {
    const parsed = new URL(downloadUrl);
    if (parsed.protocol !== 'https:') return false;

    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.endsWith('.local') ||
      hostname.endsWith('.internal')
    ) {
      return false;
    }

    if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
      const [a, b] = hostname.split('.').map(Number);
      return !(
        a === 10 ||
        a === 127 ||
        (a === 172 && b >= 16 && b <= 31) ||
        (a === 192 && b === 168) ||
        (a === 169 && b === 254)
      );
    }

    return true;
  } catch {
    return false;
  }
}

function shouldProxyApkPureDownload(downloadUrl: string) {
  try {
    const hostname = new URL(downloadUrl).hostname;
    return hostname === 'apppure.net' || hostname.endsWith('.apppure.net');
  } catch {
    return false;
  }
}

function encodeUpstreamUrl(downloadUrl: string) {
  return Buffer.from(downloadUrl, 'utf-8').toString('base64url');
}

function decodeUpstreamUrl(encoded: string) {
  try {
    return Buffer.from(encoded, 'base64url').toString('utf-8');
  } catch {
    return '';
  }
}

function sourceNameFromParam(value: string | null) {
  if (!value || !/^[a-z0-9_-]{1,40}$/i.test(value)) return 'upstream';
  return value;
}

function getRequestLocale(request: Request, explicitLocale?: unknown) {
  return normalizeDownloadLocale(explicitLocale)
    ?? normalizeDownloadLocale(new URL(request.url).searchParams.get('locale'))
    ?? localeFromAcceptLanguage(request.headers.get('accept-language'));
}

function getVisitorIdFromRequest(request: Request): string {
  const cookies = request.headers.get('cookie') || '';
  const match = cookies.match(/(?:^|;\s*)visitor_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : 'unknown';
}

async function recordDownloadPrepareFailure(
  request: Request,
  appId: string,
  error: string,
  source = '',
) {
  try {
    await initDatabase();
    await logDownload({
      visitorId: getVisitorIdFromRequest(request),
      appId,
      appTitle: appId,
      source,
      downloadUrl: '',
      version: '',
      fileSize: '',
      success: false,
      error,
    });
  } catch (logError) {
    console.warn(
      '[download-apk] recordDownloadPrepareFailure:',
      logError instanceof Error ? logError.message : logError,
    );
  }
}

function createPaidAppUnsupportedResponse(request: Request, appId: string, startedAt: number, explicitLocale?: unknown) {
  const paidApp = getUnsupportedPaidApp(appId);
  const locale = getRequestLocale(request, explicitLocale);

  void trackServerEvent(request, analyticsEvents.downloadFailed, {
    app_id: appId,
    stage: 'paid_app_unsupported',
    reason: PAID_APP_UNSUPPORTED_CODE,
    app_title: paidApp?.title ?? appId,
    duration_ms: Date.now() - startedAt,
  });

  return NextResponse.json({
    success: false,
    code: PAID_APP_UNSUPPORTED_CODE,
    error: getPaidAppUnsupportedMessage(locale),
    adminError: PAID_APP_UNSUPPORTED_ADMIN_ERROR,
    appCategory: 'paid',
  });
}

function createMirrorUnavailableResponse(request: Request, appId: string, startedAt: number, explicitLocale?: unknown) {
  const blocked = getUnsupportedNoMirrorApp(appId);
  const locale = getRequestLocale(request, explicitLocale);

  void trackServerEvent(request, analyticsEvents.downloadFailed, {
    app_id: appId,
    stage: 'mirror_unavailable',
    reason: MIRROR_UNAVAILABLE_CODE,
    app_title: blocked?.title ?? appId,
    duration_ms: Date.now() - startedAt,
  });

  return NextResponse.json({
    success: false,
    code: MIRROR_UNAVAILABLE_CODE,
    error: getMirrorUnavailableMessage(locale),
    adminError: MIRROR_UNAVAILABLE_ADMIN_ERROR,
    appCategory: blocked?.category ?? 'unlisted',
  });
}

function sanitizeFileName(fileName: string) {
  const clean = fileName
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
  return clean || 'download.apk';
}

function contentDisposition(fileName: string) {
  const hasPackageExtension = /\.(apk|xapk|apks)$/i.test(fileName);
  const safe = sanitizeFileName(hasPackageExtension ? fileName : `${fileName}.apk`);
  const asciiFallback = safe.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '_');
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(safe)}`;
}

function decodeHtmlAttribute(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#x2F;/g, '/')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function fileNameFromDownloadUrl(downloadUrl: string, fallback: string) {
  try {
    const parsed = new URL(downloadUrl);
    const disposition = parsed.searchParams.get('response-content-disposition') || '';
    const utf8Name = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
    if (utf8Name) return decodeURIComponent(utf8Name).replace(/^"|"$/g, '');
    const quotedName = disposition.match(/filename="?([^";]+)"?/i)?.[1];
    if (quotedName) return quotedName;
  } catch {
    // keep fallback
  }
  return fallback;
}

function extractApkComboDownloadUrl(content: string) {
  const hrefMatches = Array.from(content.matchAll(/href=["']([^"']*\/r2\?u=[^"']+)["']/g));
  for (const match of hrefMatches) {
    try {
      const href = decodeHtmlAttribute(match[1]);
      const redirectUrl = new URL(href, 'https://apkcombo.com');
      const directUrl = redirectUrl.searchParams.get('u');
      if (directUrl && isAllowedDownloadUrl(directUrl)) return directUrl;
    } catch {
      // ignore malformed links
    }
  }

  const directMatches = Array.from(content.matchAll(/https:\/\/[^\s"'<>)]*cloudflarestorage\.com[^\s"'<>)]*/g));
  for (const match of directMatches) {
    const directUrl = decodeHtmlAttribute(match[0]);
    if (isAllowedDownloadUrl(directUrl)) return directUrl;
  }

  return null;
}

function createDirectDownloadResponse(
  request: Request,
  appId: string,
  result: SourceResult,
  startedAt: number,
  reason: string,
  fileSize: number | null
) {
  void trackServerEvent(request, analyticsEvents.downloadStart, {
    app_id: appId,
    source: result.source,
    version: result.version,
    file_size: fileSize ?? result.size,
    proxy: 'direct-cdn',
    stage: reason,
    max_proxy_bytes: MAX_PROXY_BYTES,
    duration_ms: Date.now() - startedAt,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: result.downloadUrl,
      'Cache-Control': DOWNLOAD_CACHE_CONTROL,
      'X-APK-Proxy': 'direct-cdn',
      'X-APK-Source': result.source,
    },
  });
}

function createLimitedStream(
  source: ReadableStream<Uint8Array>,
  byteLimit: number,
  onComplete: () => void | Promise<void>,
  onAbort: (reason: string) => void | Promise<void>
) {
  const reader = source.getReader();
  let transferred = 0;
  let closed = false;

  async function complete() {
    if (closed) return;
    closed = true;
    await onComplete();
  }

  async function abort(reason: string) {
    if (closed) return;
    closed = true;
    await onAbort(reason);
  }

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        await complete();
        controller.close();
        return;
      }

      transferred += value.byteLength;
      if (transferred > byteLimit) {
        await abort('size_limit');
        controller.error(new Error('APK exceeds proxy size limit'));
        return;
      }

      controller.enqueue(value);
    },
    async cancel(reason) {
      await abort(reason ? 'client_cancel' : 'stream_cancel');
      await reader.cancel(reason);
    },
  });
}

function borrowSignal(timeoutMs: number, parent?: AbortSignal) {
  if (parent) return { signal: parent, clear: () => {} };
  return createAbortSignal(timeoutMs);
}

async function tryAptoide(appId: string, parentSignal?: AbortSignal): Promise<SourceResult | null> {
  const timeout = borrowSignal(SOURCE_TIMEOUT_MS, parentSignal);
  try {
    const apiUrl = `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(appId)}`;
    const res = await fetchWithProxy(apiUrl, {
      headers: { 'User-Agent': USER_AGENT },
      cache: 'no-store',
      signal: timeout.signal,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as AptoideResponse;
    const file = json?.data?.file;
    const path = file?.path ?? file?.path_alt;
    if (!path || !isAllowedDownloadUrl(path)) return null;
    return {
      downloadUrl: path,
      fileName: null,
      version: file?.vername ?? null,
      size: file?.filesize ?? null,
      md5: file?.md5sum ?? null,
      source: 'aptoide',
    };
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

async function tryManualDownloadSource(appId: string): Promise<SourceResult | null> {
  try {
    await initDatabase();
    const source = await getManualDownloadSource(appId);
    if (!source || !isPublicHttpsUrl(source.download_url)) return null;

    return {
      downloadUrl: source.download_url,
      fileName: source.file_name || `${appId}.apk`,
      version: null,
      size: null,
      md5: null,
      source: source.source_label || 'manual',
      preferredDelivery: 'proxy',
      trustedManual: true,
    };
  } catch (error) {
    console.warn('[download-apk] manual source lookup failed:', error);
    return null;
  }
}

async function followApkPureRedirect(
  startUrl: string,
  signal: AbortSignal,
): Promise<SourceResult | null> {
  const res = await fetchWithProxy(startUrl, {
    method: 'GET',
    headers: { 'User-Agent': USER_AGENT },
    redirect: 'manual',
    cache: 'no-store',
    signal,
  });
  if (![301, 302, 303, 307, 308].includes(res.status)) return null;
  const location = res.headers.get('location');
  if (!location || !isAllowedDownloadUrl(location)) return null;
  let fileName: string | null = null;
  try {
    const fn = new URL(location).searchParams.get('_fn');
    if (fn) fileName = Buffer.from(fn, 'base64').toString('utf-8');
  } catch {
    // ignore parse error
  }
  return {
    downloadUrl: location,
    fileName,
    version: null,
    size: null,
    md5: null,
    source: 'apkpure',
    preferredDelivery: shouldProxyApkPureDownload(location) ? 'proxy' : undefined,
  };
}

async function tryApkPure(appId: string, parentSignal?: AbortSignal): Promise<SourceResult | null> {
  const timeout = borrowSignal(SOURCE_TIMEOUT_MS, parentSignal);
  try {
    const redirectUrls = [
      `https://d.apkpure.net/b/APK/${encodeURIComponent(appId)}?version=latest`,
      `https://d.apkpure.com/b/APK/${encodeURIComponent(appId)}?version=latest`,
    ];
    for (const url of redirectUrls) {
      const result = await followApkPureRedirect(url, timeout.signal);
      if (result) return result;
    }

    const cmsUrl = await fetchApkPureCmsDownloadUrl(
      appId,
      (input, init) => fetchWithProxy(String(input), init),
      timeout.signal,
    );
    if (!cmsUrl) return null;

    if (cmsUrl.includes('/b/APK/')) {
      return followApkPureRedirect(cmsUrl, timeout.signal);
    }

    if (!isAllowedDownloadUrl(cmsUrl)) return null;
    return {
      downloadUrl: cmsUrl,
      fileName: fileNameFromDownloadUrl(cmsUrl, `${appId}.apk`),
      version: null,
      size: null,
      md5: null,
      source: 'apkpure-cms',
      preferredDelivery: shouldProxyApkPureDownload(cmsUrl) ? 'proxy' : undefined,
    };
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

async function fetchApkComboPage(
  pageUrl: string,
  signal: AbortSignal,
  fileName: string,
  type: string,
): Promise<SourceResult | null> {
  const res = await fetchWithProxy(pageUrl, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,text/plain;q=0.8,*/*;q=0.7',
      Referer: 'https://apkcombo.com/',
    },
    cache: 'no-store',
    signal,
  });
  if (!res.ok) return null;

  const content = await res.text();
  const directUrl = extractApkComboDownloadUrl(content);
  if (!directUrl) return null;

  return {
    downloadUrl: directUrl,
    fileName: fileNameFromDownloadUrl(directUrl, fileName),
    version: null,
    size: null,
    md5: null,
    source: 'apkcombo-r2',
    type,
    preferredDelivery: 'proxy',
  };
}

async function tryApkCombo(appId: string, parentSignal?: AbortSignal): Promise<SourceResult | null> {
  const knownSource = APKCOMBO_SOURCE_PAGES[appId.toLowerCase()];
  if (!knownSource) return null;

  const timeout = borrowSignal(
    parentSignal ? CHINESE_RETAIL_TIMEOUT_MS : APKCOMBO_TIMEOUT_MS,
    parentSignal,
  );
  try {
    const pageUrls = [
      knownSource.pageUrl,
      `https://r.jina.ai/${knownSource.pageUrl}`,
    ];

    for (const pageUrl of pageUrls) {
      const result = await fetchApkComboPage(
        pageUrl,
        timeout.signal,
        knownSource.fileName,
        knownSource.type,
      );
      if (result) return result;
    }

    return null;
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

async function tryApkComboDownloader(appId: string, parentSignal?: AbortSignal): Promise<SourceResult | null> {
  const timeout = borrowSignal(
    parentSignal ? CHINESE_RETAIL_TIMEOUT_MS : APKCOMBO_TIMEOUT_MS,
    parentSignal,
  );
  const fileName = `${appId}.apk`;
  try {
    const downloaderUrl = `https://apkcombo.com/downloader/?package=${encodeURIComponent(appId)}&lang=en`;
    const pageUrls = [downloaderUrl, `https://r.jina.ai/${downloaderUrl}`];

    for (const pageUrl of pageUrls) {
      const result = await fetchApkComboPage(pageUrl, timeout.signal, fileName, 'APK');
      if (result) return result;
    }

    return null;
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

async function tryOnlineApkDownloader(appId: string): Promise<SourceResult | null> {
  const packageOverride = ONLINE_APK_DOWNLOADER_PACKAGE_OVERRIDES[appId.toLowerCase()];
  const fallback = {
    fileName: `${appId}.apk`,
    type: 'APK',
  };

  const timeout = createAbortSignal(ONLINE_APK_DOWNLOADER_TIMEOUT_MS);
  try {
    const apiUrl = `https://online-apk-downloader.com/apk-ajax&packageDownload&id=${encodeURIComponent(appId)}`;
    const res = await fetchWithProxy(apiUrl, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json,text/plain;q=0.8,*/*;q=0.7',
        Referer: 'https://online-apk-downloader.com/',
      },
      cache: 'no-store',
      signal: timeout.signal,
    });
    if (!res.ok) return null;

    const json = (await res.json()) as OnlineApkDownloaderResponse;
    const downloadUrl = json.downloadUrl?.replace(/\\\//g, '/');
    if (!json.success || !downloadUrl || !isAllowedDownloadUrl(downloadUrl)) return null;

    return {
      downloadUrl,
      fileName: fileNameFromDownloadUrl(downloadUrl, packageOverride?.fileName ?? fallback.fileName),
      version: null,
      size: null,
      md5: null,
      source: 'online-apk-downloader',
      type: packageOverride?.type ?? fallback.type,
      preferredDelivery: 'proxy',
    };
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

async function tryApkComboApp(appId: string, parentSignal?: AbortSignal): Promise<SourceResult | null> {
  const timeout = borrowSignal(
    parentSignal ? CHINESE_RETAIL_TIMEOUT_MS : APKCOMBO_TIMEOUT_MS,
    parentSignal,
  );
  const knownSource = APKCOMBO_SOURCE_PAGES[appId.toLowerCase()];
  try {
    const directUrl = await resolveApkComboAppDownloadUrl(
      appId,
      (input, init) => fetchWithProxy(String(input), init),
      timeout.signal,
    );
    if (!directUrl || !isAllowedDownloadUrl(directUrl)) return null;
    return {
      downloadUrl: directUrl,
      fileName: fileNameFromDownloadUrl(
        directUrl,
        knownSource?.fileName ?? `${appId}.apk`,
      ),
      version: null,
      size: null,
      md5: null,
      source: 'apkcombo-app',
      type: knownSource?.type ?? 'APK',
      preferredDelivery: 'proxy',
    };
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

async function tryUptodown(appId: string, parentSignal?: AbortSignal): Promise<SourceResult | null> {
  const timeout = borrowSignal(
    parentSignal ? CHINESE_RETAIL_TIMEOUT_MS : APKCOMBO_TIMEOUT_MS,
    parentSignal,
  );
  try {
    const directUrl = await resolveUptodownDownloadUrl(
      appId,
      (input, init) => fetchWithProxy(String(input), init),
      timeout.signal,
    );
    if (!directUrl || !isAllowedDownloadUrl(directUrl)) return null;
    const knownSource = APKCOMBO_SOURCE_PAGES[appId.toLowerCase()];
    return {
      downloadUrl: directUrl,
      fileName: fileNameFromDownloadUrl(
        directUrl,
        knownSource?.fileName ?? `${appId}.apk`,
      ),
      version: null,
      size: null,
      md5: null,
      source: 'uptodown',
      type: knownSource?.type ?? 'APK',
      preferredDelivery: 'proxy',
    };
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

const CHINESE_RETAIL_PRIORITY_IDS = new Set([
  "com.taobao.taobao",
  "com.xunmeng.pinduoduo",
  "com.jingdong.app.mall",
  "com.eg.android.alipaygphone",
]);

const PREPARE_MIRROR_TIMEOUT_MS = Number(process.env.APK_PREPARE_MIRROR_TIMEOUT_MS ?? 12000);

function buildExternalSourceResult(
  appId: string,
  external: { url: string; source: string },
): SourceResult {
  return {
    downloadUrl: external.url,
    fileName: `${appId}.apk`,
    version: null,
    size: null,
    md5: null,
    source: external.source,
    type: "APK",
    preferredDelivery: "direct",
    externalPage: true,
    trustedManual: false,
  };
}

async function resolveDownloadSourceForPrepare(appId: string): Promise<SourceResult | null> {
  const manual = await tryManualDownloadSource(appId);
  if (manual) return manual;

  const quickTimeout = createAbortSignal(PREPARE_MIRROR_TIMEOUT_MS);
  try {
    const quick = await Promise.all([
      tryAptoide(appId, quickTimeout.signal),
      tryApkPure(appId, quickTimeout.signal),
      tryApkComboApp(appId, quickTimeout.signal),
      tryOnlineApkDownloader(appId),
    ]);
    const hit = quick.find((result) => result !== null);
    if (hit) return hit;
  } finally {
    quickTimeout.clear();
  }

  const { getExternalMirrorPageForApp } = await import("@/lib/external-mirror-pages");
  const external = getExternalMirrorPageForApp(appId);
  if (!external) return null;
  return buildExternalSourceResult(appId, external);
}

async function resolveDownloadSource(appId: string) {
  const manual = await tryManualDownloadSource(appId);
  if (manual) return manual;

  const id = appId.toLowerCase();
  if (CHINESE_RETAIL_PRIORITY_IDS.has(id)) {
    const retailTimeout = createAbortSignal(CHINESE_RETAIL_TIMEOUT_MS);
    try {
      const retailSources = await Promise.all([
        tryUptodown(appId, retailTimeout.signal),
        tryApkComboApp(appId, retailTimeout.signal),
        tryApkCombo(appId, retailTimeout.signal),
        tryApkComboDownloader(appId, retailTimeout.signal),
        tryApkPure(appId, retailTimeout.signal),
        tryAptoide(appId, retailTimeout.signal),
      ]);
      const retailHit = retailSources.find((result) => result !== null);
      if (retailHit) return retailHit;
    } finally {
      retailTimeout.clear();
    }
  }

  const candidates = await Promise.all([
    tryAptoide(appId),
    tryApkPure(appId),
    tryApkCombo(appId),
    tryApkComboDownloader(appId),
    tryApkComboApp(appId),
    tryUptodown(appId),
    tryOnlineApkDownloader(appId),
  ]);

  const direct = candidates.find((result) => result !== null);
  if (direct) return direct;

  const { getExternalMirrorPageForApp } = await import("@/lib/external-mirror-pages");
  const external = getExternalMirrorPageForApp(appId);
  if (!external) return null;

  return buildExternalSourceResult(appId, external);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appId = sanitizeAppId(searchParams.get('appId') ?? '');
  const delivery = searchParams.get('delivery');
  const upstreamToken = searchParams.get('upstream');
  const startedAt = Date.now();

  if (!appId) {
    return NextResponse.json({ success: false, error: 'Missing appId' }, { status: 400 });
  }

  if (getUnsupportedPaidApp(appId)) {
    return createPaidAppUnsupportedResponse(request, appId, startedAt);
  }

  if (getUnsupportedNoMirrorApp(appId)) {
    return createMirrorUnavailableResponse(request, appId, startedAt);
  }

  const upstreamUrl = upstreamToken ? decodeUpstreamUrl(upstreamToken) : '';
  const result = upstreamUrl && isAllowedDownloadUrl(upstreamUrl)
    ? {
        downloadUrl: upstreamUrl,
        fileName: searchParams.get('fileName') || `${appId}.apk`,
        version: null,
        size: null,
        md5: null,
        source: sourceNameFromParam(searchParams.get('source')),
      }
    : await resolveDownloadSource(appId);
  if (!result) {
    void trackServerEvent(request, analyticsEvents.downloadFailed, {
      app_id: appId,
      stage: 'source_resolution',
      reason: 'source_not_available',
      duration_ms: Date.now() - startedAt,
    });
    void recordDownloadPrepareFailure(
      request,
      appId,
      'This APK is not available from our sources.',
      'get-source-resolution',
    );

    return NextResponse.json(
      { success: false, error: 'This APK is not available from our sources.' },
      { status: 404 }
    );
  }

  if (result.externalPage || delivery !== 'proxy') {
    return createDirectDownloadResponse(request, appId, result, startedAt, 'direct_default', result.size);
  }

  const timeout = createAbortSignal(STREAM_TIMEOUT_MS);
  try {
    const upstream = await fetchWithProxy(result.downloadUrl, {
      headers: { 'User-Agent': USER_AGENT },
      cache: 'no-store',
      signal: timeout.signal,
    });

    if (!upstream.ok || !upstream.body) {
      timeout.clear();
      const upstreamError = `Upstream download failed (${upstream.status})`;
      void trackServerEvent(request, analyticsEvents.downloadFailed, {
        app_id: appId,
        source: result.source,
        stage: 'upstream_response',
        upstream_status: upstream.status,
        duration_ms: Date.now() - startedAt,
      });
      void recordDownloadPrepareFailure(request, appId, upstreamError, result.source);

      return NextResponse.json(
        { success: false, error: upstreamError },
        { status: 502 }
      );
    }

    const contentLength = Number(upstream.headers.get('content-length') ?? 0);
    if (contentLength > MAX_PROXY_BYTES) {
      timeout.abort();
      timeout.clear();
      return createDirectDownloadResponse(request, appId, result, startedAt, 'proxy_size_limit_redirect', contentLength);
    }

    const fileName = result.fileName ?? `${appId}.apk`;
    const headers = new Headers({
      'Content-Type': upstream.headers.get('content-type') || APK_CONTENT_TYPE,
      'Content-Disposition': contentDisposition(fileName),
      'Cache-Control': DOWNLOAD_CACHE_CONTROL,
      'X-APK-Proxy': 'vercel-stream',
      'X-APK-Source': result.source,
    });

    if (contentLength > 0) {
      headers.set('Content-Length', String(contentLength));
    }
    if (result.version) {
      headers.set('X-APK-Version', result.version);
    }
    if (result.md5) {
      headers.set('X-APK-MD5', result.md5);
    }

    void trackServerEvent(request, analyticsEvents.downloadStart, {
      app_id: appId,
      source: result.source,
      version: result.version,
      file_size: contentLength || result.size,
      proxy: 'vercel-stream',
      duration_ms: Date.now() - startedAt,
    });

    let streamEventSent = false;
    const trackStreamEnd = async (eventName: typeof analyticsEvents.downloadSuccess | typeof analyticsEvents.downloadFailed, params: Record<string, string | number | null>) => {
      if (streamEventSent) return;
      streamEventSent = true;
      await trackServerEvent(request, eventName, {
        app_id: appId,
        source: result.source,
        version: result.version,
        file_size: contentLength || result.size,
        proxy: 'vercel-stream',
        duration_ms: Date.now() - startedAt,
        ...params,
      });
    };

    const body = createLimitedStream(
      upstream.body,
      MAX_PROXY_BYTES,
      async () => {
        timeout.clear();
        await trackStreamEnd(analyticsEvents.downloadSuccess, { stage: 'stream_complete' });
      },
      async (reason) => {
        timeout.abort();
        timeout.clear();
        await trackStreamEnd(analyticsEvents.downloadFailed, { stage: 'stream_abort', reason });
      }
    );

    return new Response(body, { status: 200, headers });
  } catch (err) {
    timeout.clear();
    const isAbort = err instanceof DOMException && err.name === 'AbortError';
    void trackServerEvent(request, analyticsEvents.downloadFailed, {
      app_id: appId,
      source: result.source,
      stage: isAbort ? 'timeout' : 'proxy_error',
      reason: err instanceof Error ? err.message : 'unknown_error',
      duration_ms: Date.now() - startedAt,
    });

    const proxyError = isAbort ? 'Download timed out. Please try again.' : 'Download proxy failed.';
    void recordDownloadPrepareFailure(request, appId, proxyError, result.source);

    return NextResponse.json(
      {
        success: false,
        error: proxyError,
        source: result.source,
      },
      { status: 502 }
    );
  }
}

// All responses use HTTP 200 with `success` flag, because Cloudflare (in front
// of this site) intercepts 4xx/5xx and replaces the body with its own HTML
// error page — the client would never see our JSON.
export async function POST(request: Request) {
  try {
    const { appId, locale } = await request.json();
    const startedAt = Date.now();

    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing appId' });
    }

    const cleanId = sanitizeAppId(appId);

    if (getUnsupportedPaidApp(cleanId)) {
      return createPaidAppUnsupportedResponse(request, cleanId, startedAt, locale);
    }

    if (getUnsupportedNoMirrorApp(cleanId)) {
      return createMirrorUnavailableResponse(request, cleanId, startedAt, locale);
    }

    // Try Aptoide first (simpler, has CORS, fast metadata).
    // Fall back to APKPure for region-locked or less-common apps.
    const result = await resolveDownloadSourceForPrepare(cleanId);

    if (!result) {
      void recordDownloadPrepareFailure(
        request,
        cleanId,
        'This APK is not available from our sources.',
        'prepare',
      );
      return NextResponse.json({
        success: false,
        error: 'This APK is not available from our sources.',
      });
    }

    const useProxyByDefault = result.preferredDelivery === 'proxy';
    const fileName = result.fileName ?? `${cleanId}.apk`;
    const proxyUrl = result.trustedManual
      ? `/api/download-apk?appId=${encodeURIComponent(cleanId)}&delivery=proxy`
      : `/api/download-apk?appId=${encodeURIComponent(cleanId)}&delivery=proxy&upstream=${encodeURIComponent(encodeUpstreamUrl(result.downloadUrl))}&source=${encodeURIComponent(result.source)}&fileName=${encodeURIComponent(fileName)}`;

    return NextResponse.json({
      success: true,
      downloadUrl: result.externalPage
        ? result.downloadUrl
        : useProxyByDefault
          ? proxyUrl
          : `/api/download-apk?appId=${encodeURIComponent(cleanId)}&delivery=direct`,
      fallbackDownloadUrl: result.externalPage
        ? ''
        : useProxyByDefault
          ? result.downloadUrl
          : proxyUrl,
      fileName,
      type: result.type ?? 'APK',
      version: result.version,
      size: result.size,
      md5: result.md5,
      source: result.source,
      proxy: result.externalPage ? 'external-page' : useProxyByDefault ? 'vercel-stream' : 'direct-cdn',
      externalPage: result.externalPage ?? false,
      maxProxyBytes: MAX_PROXY_BYTES,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Download preparation failed',
    });
  }
}
