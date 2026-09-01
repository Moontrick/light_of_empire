import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSteamProfile } from '@/shared/api/steamProfile';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 422 });
  }

  try {
    const profile = await getSteamProfile(url);
    if (!profile) {
      return NextResponse.json({ error: 'Steam profile not found' }, { status: 404 });
    }

    return NextResponse.json(profile, {
      headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error('[steam-profile] Failed to resolve Steam profile', error);
    return NextResponse.json({ error: 'Steam request failed' }, { status: 502 });
  }
}
