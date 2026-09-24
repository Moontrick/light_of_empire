'use client';

import { useEffect } from 'react';
import { useDonationsStore } from '@/shared/store/donationsStore';
import { useAuthStore } from '@store/authStore';

export function useDonationsShowcase() {
  const { items, listStatus, fetchList } = useDonationsStore();
  const authStatus = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  return {
    items,
    loading: listStatus === 'idle' || listStatus === 'loading',
    error: listStatus === 'error',
    empty: listStatus === 'ready' && items.length === 0,
    retry: fetchList,
    balance: user?.balance ?? 0,
    authPending: authStatus === 'idle' || authStatus === 'loading',
    guest: authStatus === 'guest',
  };
}
