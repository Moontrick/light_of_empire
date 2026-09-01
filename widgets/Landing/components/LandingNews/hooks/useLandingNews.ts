'use client';

import { useEffect } from 'react';
import { useNewsStore } from '@/shared/store/newsStore';

const LANDING_NEWS_COUNT = 3;

export function useLandingNews() {
  const { posts, feedStatus, fetchFeed } = useNewsStore();

  useEffect(() => {
    if (feedStatus === 'idle') void fetchFeed();
  }, [feedStatus, fetchFeed]);

  return {
    items: posts.slice(0, LANDING_NEWS_COUNT),
    loading: feedStatus === 'idle' || feedStatus === 'loading',
  };
}
