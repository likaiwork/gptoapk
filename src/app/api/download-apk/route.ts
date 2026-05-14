import { NextResponse } from 'next/server';
import { fetchDispatcher } from '@/lib/proxy';
import { analyticsEvents, trackServerEvent } from '@/lib/server-analytics';

export const runtime = 'nodejs';
export const maxDuration = 300;

const SOURCE_TIMEOUT_MS = Number(process.env.APK_SOURCE_TIMEOUT_MS ?? 12000);
const STREAM_TIMEOUT_MS = Number(process.env.APK_STREAM_TIMEOUT_MS ?? 280000);
const MAX_PROXY_BYTES = Number(process.env.APK_PROXY_MAX_BYTES ?? 300 * 1024 * 1024);
const USER_AGENT = 'Mozilla/5.0 (compatible; gptoapk/1.0; +https://gptoapk.com)';
const APK_CONTENT_TYPE = 'application/vnd.android.package-archive';

const ALLOWED_DOWNLOAD_HOST_SUFFIXES = ['.aptoide.com', '.winudf.com'];

type SourceResult = {
  downloadUrl: string;
  fileName: string | null;
  version: string | null;
  size: number | null;
  md5: string | null;
  source: string;
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

function sanitizeFileName(fileName: string) {
  const clean = fileName
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
  return clean || 'download.apk';
}

function contentDisposition(fileName: string) {
  const safe = sanitizeFileName(fileName.endsWith('.apk') ? fileName : `${fileName}.apk`);
  const asciiFallback = safe.replace(/[^\x20-\x7E]/g, '_').replace(/"/g, '_');
  return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encodeURIComponent(safe)}`;
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
      'Cache-Control': 'no-store',
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

async function tryAptoide(appId: string): Promise<SourceResult | null> {
  const timeout = createAbortSignal(SOURCE_TIMEOUT_MS);
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

async function tryApkPure(appId: string): Promise<SourceResult | null> {
  const timeout = createAbortSignal(SOURCE_TIMEOUT_MS);
  try {
    // d.apkpure.net 302-redirects to a winudf CDN URL with a signed `k` token.
    // We capture the Location header and proxy it through this API route.
    const url = `https://d.apkpure.net/b/APK/${encodeURIComponent(appId)}?version=latest`;
    const res = await fetchWithProxy(url, {
      method: 'GET',
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'manual',
      cache: 'no-store',
      signal: timeout.signal,
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
    };
  } catch {
    return null;
  } finally {
    timeout.clear();
  }
}

async function resolveDownloadSource(appId: string) {
  return (await tryAptoide(appId)) ?? (await tryApkPure(appId));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appId = searchParams.get('appId')?.trim();
  const delivery = searchParams.get('delivery');
  const startedAt = Date.now();

  if (!appId) {
    return NextResponse.json({ success: false, error: 'Missing appId' }, { status: 400 });
  }

  const result = await resolveDownloadSource(appId);
  if (!result) {
    void trackServerEvent(request, analyticsEvents.downloadFailed, {
      app_id: appId,
      stage: 'source_resolution',
      reason: 'source_not_available',
      duration_ms: Date.now() - startedAt,
    });

    return NextResponse.json(
      { success: false, error: 'This APK is not available from our sources.' },
      { status: 404 }
    );
  }

  if (delivery === 'direct') {
    return createDirectDownloadResponse(request, appId, result, startedAt, 'direct_requested', result.size);
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
      void trackServerEvent(request, analyticsEvents.downloadFailed, {
        app_id: appId,
        source: result.source,
        stage: 'upstream_response',
        upstream_status: upstream.status,
        duration_ms: Date.now() - startedAt,
      });

      return NextResponse.json(
        { success: false, error: `Upstream download failed (${upstream.status})` },
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
      'Cache-Control': 'no-store',
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

    return NextResponse.json(
      {
        success: false,
        error: isAbort ? 'Download timed out. Please try again.' : 'Download proxy failed.',
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
    const { appId } = await request.json();

    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ success: false, error: 'Missing appId' });
    }

    const cleanId = appId.trim();

    // Try Aptoide first (simpler, has CORS, fast metadata).
    // Fall back to APKPure for region-locked or less-common apps.
    const result = await resolveDownloadSource(cleanId);

    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'This APK is not available from our sources.',
      });
    }

    if (result.size && result.size > MAX_PROXY_BYTES) {
      return NextResponse.json({
        success: true,
        downloadUrl: `/api/download-apk?appId=${encodeURIComponent(cleanId)}&delivery=direct`,
        fileName: result.fileName ?? `${cleanId}.apk`,
        type: 'APK',
        version: result.version,
        size: result.size,
        md5: result.md5,
        source: result.source,
        proxy: 'direct-cdn',
        maxProxyBytes: MAX_PROXY_BYTES,
      });
    }

    return NextResponse.json({
      success: true,
      downloadUrl: `/api/download-apk?appId=${encodeURIComponent(cleanId)}`,
      fileName: result.fileName ?? `${cleanId}.apk`,
      type: 'APK',
      version: result.version,
      size: result.size,
      md5: result.md5,
      source: result.source,
      proxy: 'vercel-stream',
      maxProxyBytes: MAX_PROXY_BYTES,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Download preparation failed',
    });
  }
}
