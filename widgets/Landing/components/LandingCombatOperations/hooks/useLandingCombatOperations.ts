'use client';

import { useEffect } from 'react';
import { useCombatOperationsStore } from '@/shared/store/combatOperationsStore';

const LANDING_COMBAT_OPERATIONS_COUNT = 3;

export function useLandingCombatOperations() {
  const { posts, feedStatus, fetchFeed } = useCombatOperationsStore();

  useEffect(() => {
    if (feedStatus === 'idle') void fetchFeed();
  }, [feedStatus, fetchFeed]);

  return {
    items: posts.slice(0, LANDING_COMBAT_OPERATIONS_COUNT),
    loading: feedStatus === 'idle' || feedStatus === 'loading',
  };
}
