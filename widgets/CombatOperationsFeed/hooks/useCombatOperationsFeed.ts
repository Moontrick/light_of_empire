'use client';

import { useEffect } from 'react';
import { useCombatOperationsStore } from '@/shared/store/combatOperationsStore';
import { groupCombatOperationsByDate } from '../lib/groupCombatOperationsByDate';

export function useCombatOperationsFeed() {
  const { posts, total, feedStatus, fetchFeed, loadMore } = useCombatOperationsStore();

  useEffect(() => {
    void fetchFeed();
  }, [fetchFeed]);

  return {
    groups: groupCombatOperationsByDate(posts),
    loading: feedStatus === 'idle' || feedStatus === 'loading',
    loadingMore: feedStatus === 'loadingMore',
    hasMore: posts.length < total,
    empty: feedStatus === 'ready' && posts.length === 0,
    error: feedStatus === 'error',
    loadMore,
    retry: fetchFeed,
  };
}
