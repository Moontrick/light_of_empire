import { NextResponse } from 'next/server';

import { getServerStatus } from '@/shared/api/gameServer';
import type { ServerStatus } from '@/shared/api/gameServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const buildOfflineFallback = (): ServerStatus => ({
  online: false,
  name: '',
  map: '',
  players: 0,
  maxPlayers: 0,
  bots: 0,
  playerList: [],
  connect: '',
  updatedAt: new Date().toISOString(),
});

export async function GET() {
  let status: ServerStatus;

  try {
    status = await getServerStatus();
  } catch (error) {
    console.error('[server-status] Unexpected failure resolving server status', error);
    status = buildOfflineFallback();
  }

  return NextResponse.json(status, {
    status: 200,
    headers: {
      // Наш модульный кэш уже держит данные 30с — не даём браузеру/прокси
      // кэшировать дольше этого окна.
      'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=15',
    },
  });
}
