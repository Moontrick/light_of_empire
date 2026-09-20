'use client';

import { useEffect } from 'react';
import { useDonationsStore } from '@/shared/store/donationsStore';

export function useDonationsShowcase() {
  const { items, listStatus, fetchList } = useDonationsStore();

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  return {
    items,
    loading: listStatus === 'idle' || listStatus === 'loading',
    error: listStatus === 'error',
    empty: listStatus === 'ready' && items.length === 0,
    retry: fetchList,
  };
}
