'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { useForumStore } from '@store/forumStore';
import { FORUM_SEARCH_DEBOUNCE_MS } from '@/shared/constants';
import { useThreadsQuery } from './useThreadsQuery';

export function useForumCategory(slug: string) {
  const {
    categories, categoriesStatus, fetchCategories,
    tags, fetchTags,
    threads, threadsTotal, threadsStatus, fetchThreads, loadMoreThreads,
  } = useForumStore();
  const authStatus = useAuthStore((state) => state.status);
  const { query, setQuery } = useThreadsQuery();

  // Поле поиска — локально, в URL уходит с задержкой
  const [search, setSearch] = useState(query.q ?? '');

  useEffect(() => {
    void fetchCategories();
    void fetchTags();
  }, [fetchCategories, fetchTags]);

  useEffect(() => {
    void fetchThreads({ category: slug, tag: query.tag, q: query.q, sort: query.sort });
  }, [slug, query.tag, query.q, query.sort, fetchThreads]);

  useEffect(() => {
    const trimmed = search.trim() || undefined;
    if (trimmed === query.q) return;
    const timer = setTimeout(() => setQuery({ q: trimmed }), FORUM_SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search, query.q, setQuery]);

  // Обратная синхронизация из URL («назад», внешняя ссылка); при совпадении не трогаем
  // локальный текст, чтобы не откатывать то, что пользователь набирает
  useEffect(() => {
    setSearch((prev) => ((prev.trim() || undefined) === query.q ? prev : query.q ?? ''));
  }, [query.q]);

  const category = categories.find((item) => item.slug === slug) ?? null;
  const categoriesLoading = categoriesStatus === 'idle' || categoriesStatus === 'loading';

  return {
    category,
    categoryNotFound: categoriesStatus === 'ready' && !category,
    categoriesLoading,
    categoriesError: categoriesStatus === 'error',
    retryCategories: () => fetchCategories(true),
    tags,
    threads,
    loading: threadsStatus === 'idle' || threadsStatus === 'loading',
    loadingMore: threadsStatus === 'loadingMore',
    error: threadsStatus === 'error',
    empty: threadsStatus === 'ready' && threads.length === 0,
    hasMore: threads.length < threadsTotal,
    search,
    setSearch,
    tag: query.tag,
    setTag: (tag?: number) => setQuery({ tag }),
    sort: query.sort,
    setSort: (sort: typeof query.sort) => setQuery({ sort }),
    canCreate: authStatus === 'authenticated' && Boolean(category) && !category?.is_archived,
    isGuest: authStatus === 'guest',
    loadMore: loadMoreThreads,
    retry: () => fetchThreads({ category: slug, tag: query.tag, q: query.q, sort: query.sort }),
  };
}
