'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ServerStatus } from '@/shared/api/gameServer';
import type { UseServerStatusResult } from './types';

const SERVER_STATUS_ENDPOINT = '/api/server-status';
const POLL_INTERVAL_MS = 60_000;

export function useServerStatus(): UseServerStatusResult {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await fetch(SERVER_STATUS_ENDPOINT, { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`Server status request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ServerStatus;

      if (!isMountedRef.current) return;
      setStatus(data);
      setError(null);
    } catch (err) {
      if (!isMountedRef.current) return;
      setError(err instanceof Error ? err.message : 'Unknown server status error');
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchStatus();

    const intervalId = window.setInterval(fetchStatus, POLL_INTERVAL_MS);

    return () => {
      isMountedRef.current = false;
      window.clearInterval(intervalId);
    };
  }, [fetchStatus]);

  return { status, loading, error };
}
