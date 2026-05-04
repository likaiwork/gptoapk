import { NextResponse } from 'next/server';
import gplay from 'google-play-scraper';
import { gplayRequestOptions as requestOptions } from '@/lib/proxy';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('url');

  if (!query) {
    console.log('[API fetch-info] Failed: Missing URL or package name');
    return NextResponse.json({ error: 'Missing URL or package name' }, { status: 400 });
  }

  console.log(`\n======================================`);
  console.log(`[API fetch-info] Request received: ${query}`);
  console.log(`======================================`);

  try {
    let appId = query;
    let lang = 'en';
    let country = 'us';

    // Extract appId if the user pasted a full Google Play URL
    if (query.includes('play.google.com')) {
      try {
        const urlObj = new URL(query);
        appId = urlObj.searchParams.get('id') || query;
        if (urlObj.searchParams.has('hl')) {
          lang = urlObj.searchParams.get('hl') as string;
        }
        if (urlObj.searchParams.has('gl')) {
          country = urlObj.searchParams.get('gl') as string;
        }
      } catch (e) {
        // Not a valid URL, fallback to using it as string
      }
    }

    // Clean up appId
    appId = appId.trim();

    console.log(`[API fetch-info] Parsed parameters -> appId: "${appId}", lang: "${lang}", country: "${country}"`);
    console.log(`[API fetch-info] Initiating fetch from Google Play (timeout: 8s)...`);

    // Fetch app details using google-play-scraper with a timeout
    // (This prevents hanging indefinitely if Google Play is blocked by network)
    const fetchPromise = gplay.app({ appId, lang, country, requestOptions } as Parameters<typeof gplay.app>[0]).then(res => {
      console.log(`[API fetch-info] Fetch SUCCESS for ${appId}`);
      return res;
    });
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Network timeout: Cannot connect to Google Play')), 8000)
    );

    const appInfo: any = await Promise.race([fetchPromise, timeoutPromise]);
    console.log(`[API fetch-info] Sending response back to client for ${appId}`);

    return NextResponse.json({
      title: appInfo.title,
      appId: appInfo.appId,
      lang,
      country,
      icon: appInfo.icon,
      version: appInfo.version,
      developer: appInfo.developer,
      score: appInfo.scoreText,
      size: appInfo.size,
      updated: appInfo.updated ? new Date(appInfo.updated).toISOString() : null,
    });
  } catch (error: any) {
    console.error(`[API fetch-info] ERROR: ${error.message}`);
    return NextResponse.json({ error: 'App not found or invalid Google Play URL' }, { status: 404 });
  }
}
