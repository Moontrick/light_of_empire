'use client';

import { useEffect, useMemo } from 'react';
import { useDonationsStore } from '@/shared/store/donationsStore';
import { useAuthStore } from '@store/authStore';
import type { DonationListItem } from '@/shared/types';
import { SHOWCASE_FEATURED_MIN_ITEMS } from '../constants';

export function useDonationsShowcase() {
  const { items, listStatus, fetchList } = useDonationsStore();
  const authStatus = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  // Главный лот витрины — самый дорогой товар: именно он «продаёт» магазин
  const featured = useMemo<DonationListItem | null>(() => {
    if (items.length < SHOWCASE_FEATURED_MIN_ITEMS) return null;

    return items.reduce((best, item) => (item.price > best.price ? item : best), items[0]);
  }, [items]);

  const rest = useMemo(
    () => (featured ? items.filter((item) => item.id !== featured.id) : items),
    [items, featured],
  );

  return {
    featured,
    rest,
    loading: listStatus === 'idle' || listStatus === 'loading',
    error: listStatus === 'error',
    empty: listStatus === 'ready' && items.length === 0,
    retry: fetchList,
    balance: user?.balance ?? 0,
    authPending: authStatus === 'idle' || authStatus === 'loading',
    guest: authStatus === 'guest',
  };
}
