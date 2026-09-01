'use client';

import { useEffect } from 'react';
import { useNewsStore } from '@/shared/store/newsStore';
import { groupNewsByDate } from '../lib/groupNewsByDate';

export function useNewsFeed() {
  const { posts, total, feedStatus, fetchFeed, loadMore } = useNewsStore();

  useEffect(() => {
    void fetchFeed();
  }, [fetchFeed]);

  return {
    groups: groupNewsByDate(posts),
    loading: feedStatus === 'idle' || feedStatus === 'loading',
    loadingMore: feedStatus === 'loadingMore',
    hasMore: posts.length < total,
    empty: feedStatus === 'ready' && posts.length === 0,
    error: feedStatus === 'error',
    loadMore,
    retry: fetchFeed,
  };
}
