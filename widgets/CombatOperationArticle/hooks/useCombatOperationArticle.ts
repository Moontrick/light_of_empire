'use client';

import { useEffect } from 'react';
import { useCombatOperationsStore } from '@/shared/store/combatOperationsStore';

export function useCombatOperationArticle(slug: string) {
  const { article, articleStatus, fetchArticle } = useCombatOperationsStore();

  useEffect(() => {
    void fetchArticle(slug);
  }, [slug, fetchArticle]);

  return {
    article,
    loading: articleStatus === 'idle' || articleStatus === 'loading',
    notFound: articleStatus === 'notFound',
    error: articleStatus === 'error',
    retry: () => fetchArticle(slug),
  };
}
