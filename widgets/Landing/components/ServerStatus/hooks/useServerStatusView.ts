'use client';

import { useServerStatus } from '@/shared/hooks/useServerStatus';
import { SERVER_ADDRESS } from '@/shared/constants';
import { STATUS_FALLBACK_NAME } from '../constants';
import type { ServerStatusViewModel } from '../types';

function toFillPercent(players: number, maxPlayers: number): number {
  if (maxPlayers <= 0) return 0;

  return Math.min(100, Math.round((players / maxPlayers) * 100));
}

function toUpdatedAtLabel(updatedAt?: string): string {
  if (!updatedAt) return '';

  const parsed = new Date(updatedAt);

  if (Number.isNaN(parsed.getTime())) return '';

  return parsed.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function useServerStatusView(): ServerStatusViewModel {
  const { status, loading, error } = useServerStatus();

  const isFirstLoad = loading && !status;
  const hasFailed = !status && !loading && Boolean(error);
  const players = status?.players ?? 0;
  const maxPlayers = status?.maxPlayers ?? 0;

  return {
    isFirstLoad,
    hasFailed,
    isOnline: status?.online ?? false,
    serverName: status?.name || STATUS_FALLBACK_NAME,
    map: status?.map ?? '',
    players,
    maxPlayers,
    fillPercent: toFillPercent(players, maxPlayers),
    address: SERVER_ADDRESS,
    updatedAtLabel: toUpdatedAtLabel(status?.updatedAt),
    connectHref: `steam://connect/${status?.connect || SERVER_ADDRESS}`,
  };
}
