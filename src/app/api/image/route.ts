import { NextResponse } from 'next/server';
import got from 'got';
import { gotProxyAgent } from '@/lib/proxy';

const ALLOWED_HOSTS = new Set([
  'play-lh.googleusercontent.com',
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com',
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('u');

  if (!target) {
    return NextResponse.json({ error: 'Missing u param' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
  }

  if (parsed.protocol !== 'https:' || !ALLOWED_HOSTS.has(parsed.hostname)) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 400 });
  }

  try {
    const upstream = await got(parsed.toString(), {
      agent: gotProxyAgent,
      timeout: { request: 15000 },
      retry: { limit: 1 },
      responseType: 'buffer',
    });

    return new NextResponse(new Uint8Array(upstream.rawBody), {
      status: 200,
      headers: {
        'Content-Type': upstream.headers['content-type'] || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (err: any) {
    console.error('[API image] ERROR:', err.message);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
  }
}
