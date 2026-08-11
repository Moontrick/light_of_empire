'use client';

import { useServerStatus } from '@/shared/hooks/useServerStatus';
import { SERVER_ADDRESS } from '@/shared/constants';
import { STATUS_FALLBACK_NAME } from '../constants';
import type { ServerStatusViewModel } from '../types';

export function useServerStatusView(): ServerStatusViewModel {
  const { status, loading, error } = useServerStatus();

  const isFirstLoad = loading && !status;
  const hasFailed = !status && !loading && Boolean(error);

  return {
    isFirstLoad,
    hasFailed,
    isOnline: status?.online ?? false,
    serverName: status?.name || STATUS_FALLBACK_NAME,
    map: status?.map ?? '',
    players: status?.players ?? 0,
    maxPlayers: status?.maxPlayers ?? 0,
    connectHref: `steam://connect/${status?.connect || SERVER_ADDRESS}`,
  };
}
