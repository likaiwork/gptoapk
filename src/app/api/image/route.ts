import { NextResponse } from 'next/server';
import { fetchDispatcher } from '@/lib/proxy';

export const maxDuration = 30;

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
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    const upstream = await fetch(parsed.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; gptoapk/1.0; +https://gptoapk.com)',
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      },
      signal: controller.signal,
      ...(fetchDispatcher ? { dispatcher: fetchDispatcher } : {}),
    } as RequestInit & { dispatcher?: typeof fetchDispatcher });
    clearTimeout(timer);

    if (!upstream.ok) {
      return NextResponse.json({ error: `Upstream ${upstream.status}` }, { status: 502 });
    }

    const buf = await upstream.arrayBuffer();
    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800',
      },
    });
  } catch (err: unknown) {
    console.error('[API image] ERROR:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 502 });
  }
}
