import { NextResponse } from 'next/server';
import { fetchDispatcher } from '@/lib/proxy';

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { appId } = await request.json();

    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ error: 'Missing appId' }, { status: 400 });
    }

    const cleanId = appId.trim();
    const apiUrl = `https://ws75.aptoide.com/api/7/app/getMeta?package_name=${encodeURIComponent(cleanId)}`;

    const apiRes = await fetch(apiUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      cache: 'no-store',
      // @ts-expect-error -- undici-specific option, honored by Node fetch
      dispatcher: fetchDispatcher,
    });

    if (!apiRes.ok) {
      return NextResponse.json(
        { error: `APK source returned HTTP ${apiRes.status}` },
        { status: 502 }
      );
    }

    const json = await apiRes.json();
    const file = json?.data?.file;
    const path: string | undefined = file?.path ?? file?.path_alt;

    if (!path) {
      return NextResponse.json(
        { error: 'This APK is not available from our source.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      downloadUrl: path,
      fileName: `${cleanId}.apk`,
      type: 'APK',
      version: file.vername ?? null,
      size: file.filesize ?? null,
      md5: file.md5sum ?? null,
    });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
