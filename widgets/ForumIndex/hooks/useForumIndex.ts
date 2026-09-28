'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';
import { useForumStore } from '@store/forumStore';

export function useForumIndex() {
  const { categories, categoriesStatus, fetchCategories } = useForumStore();
  const authStatus = useAuthStore((state) => state.status);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading: categoriesStatus === 'idle' || categoriesStatus === 'loading',
    error: categoriesStatus === 'error',
    empty: categoriesStatus === 'ready' && categories.length === 0,
    canCreate: authStatus === 'authenticated',
    isGuest: authStatus === 'guest',
    retry: () => fetchCategories(true),
  };
}
