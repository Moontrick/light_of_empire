'use client';

import { useServerStatus } from '@/shared/hooks/useServerStatus';
import type { ServerBadgeViewModel } from '../types';

export function useServerBadge(): ServerBadgeViewModel {
  const { status, loading } = useServerStatus();

  return {
    isFirstLoad: loading && !status,
    isOnline: status?.online ?? false,
    players: status?.players ?? 0,
    maxPlayers: status?.maxPlayers ?? 0,
  };
}
