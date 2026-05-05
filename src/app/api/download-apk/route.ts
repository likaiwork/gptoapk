import { NextResponse } from 'next/server';
import { fetchDispatcher } from '@/lib/proxy';

export const maxDuration = 30;

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

async function tryAptoide(appId: string): Promise<SourceResult | null> {
  try {
    const apiUrl = `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(appId)}`;
    const res = await fetch(apiUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
      // @ts-expect-error -- undici-specific option
      dispatcher: fetchDispatcher,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as AptoideResponse;
    const file = json?.data?.file;
    const path = file?.path ?? file?.path_alt;
    if (!path) return null;
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
  }
}

async function tryApkPure(appId: string): Promise<SourceResult | null> {
  try {
    // d.apkpure.net 302-redirects to a winudf CDN URL with a signed `k` token.
    // We capture the Location header and hand it to the browser — the URL is
    // not IP-bound, so the user can fetch it directly.
    const url = `https://d.apkpure.net/b/APK/${encodeURIComponent(appId)}?version=latest`;
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      redirect: 'manual',
      cache: 'no-store',
      // @ts-expect-error -- undici-specific option
      dispatcher: fetchDispatcher,
    });
    if (![301, 302, 303, 307, 308].includes(res.status)) return null;
    const location = res.headers.get('location');
    if (!location || !location.includes('.winudf.com')) return null;
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
    const result = (await tryAptoide(cleanId)) ?? (await tryApkPure(cleanId));

    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'This APK is not available from our sources.',
      });
    }

    return NextResponse.json({
      success: true,
      downloadUrl: result.downloadUrl,
      fileName: result.fileName ?? `${cleanId}.apk`,
      type: 'APK',
      version: result.version,
      size: result.size,
      md5: result.md5,
      source: result.source,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Download preparation failed',
    });
  }
}
