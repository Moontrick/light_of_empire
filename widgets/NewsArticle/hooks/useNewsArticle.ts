'use client';

import { useEffect } from 'react';
import { useNewsStore } from '@/shared/store/newsStore';

export function useNewsArticle(slug: string) {
  const { article, articleStatus, fetchArticle } = useNewsStore();

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
