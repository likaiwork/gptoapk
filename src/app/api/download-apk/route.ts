import { NextResponse } from 'next/server';
import { fetchDispatcher } from '@/lib/proxy';

export const maxDuration = 30;

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
    const apiUrl = `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(cleanId)}`;

    const apiRes = await fetch(apiUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
      // @ts-expect-error -- undici-specific option, honored by Node fetch
      dispatcher: fetchDispatcher,
    });

    let json: { data?: { file?: { path?: string; path_alt?: string; vername?: string; filesize?: number; md5sum?: string } } } | null = null;
    try {
      json = await apiRes.json();
    } catch {
      // non-JSON body (rare); fall through to error response below
    }

    const file = json?.data?.file;
    const path: string | undefined = file?.path ?? file?.path_alt;

    if (!path) {
      return NextResponse.json({
        success: false,
        error: 'This APK is not available from our source.',
      });
    }

    return NextResponse.json({
      success: true,
      downloadUrl: path,
      fileName: `${cleanId}.apk`,
      type: 'APK',
      version: file?.vername ?? null,
      size: file?.filesize ?? null,
      md5: file?.md5sum ?? null,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Download preparation failed',
    });
  }
}
