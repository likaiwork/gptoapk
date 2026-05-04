import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { appId } = await request.json();

    if (!appId || typeof appId !== 'string') {
      return NextResponse.json({ error: 'Missing appId' }, { status: 400 });
    }

    // Cloudflare bot detection blocks our datacenter IP from scraping APKCombo
    // directly. Instead, hand the user's browser the APKCombo download page —
    // their residential IP clears the challenge automatically.
    return NextResponse.json({
      success: true,
      downloadUrl: `https://apkcombo.com/x/${encodeURIComponent(appId)}/download/apk`,
      fileName: `${appId}.apk`,
      type: 'APK',
    });
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
