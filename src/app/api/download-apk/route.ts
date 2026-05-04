import { NextResponse } from 'next/server';
import { fetchApkVariants, pickBestVariant } from '@/lib/apk-source';

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { appId } = await request.json();

    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ error: 'Missing appId' }, { status: 400 });
    }

    console.log(`[API download-apk] Resolving APK for "${appId}" via APKCombo...`);

    const variants = await fetchApkVariants(appId);
    const apk = pickBestVariant(variants);

    if (!apk) {
      console.warn(`[API download-apk] No variants found for ${appId}`);
      return NextResponse.json(
        { error: 'No APK available for this package on the upstream mirror' },
        { status: 404 },
      );
    }

    console.log(
      `[API download-apk] OK ${appId}: type=${apk.type} filename="${apk.filename}"`,
    );

    return NextResponse.json({
      success: true,
      // Wrapper URL: the browser will follow APKCombo's redirect and solve any
      // Cloudflare challenge with its own JS engine, then download the APK.
      downloadUrl: apk.wrapperUrl,
      fileName: apk.filename || `${appId}.apk`,
      type: apk.type,
      variantCount: variants.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[API download-apk] ERROR:', message);
    return NextResponse.json(
      { error: `Failed to resolve download link: ${message}` },
      { status: 502 },
    );
  }
}
