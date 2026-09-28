'use client';

import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/shared/i18n/navigation';
import type { ForumThreadSort } from '@/shared/types';

export interface ThreadsQuery {
  tag?: number;
  q?: string;
  sort: ForumThreadSort;
}

// Фильтры живут в URL (?tag&q&sort), чтобы «назад» и ссылки сохраняли состояние
export function useThreadsQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const query = useMemo<ThreadsQuery>(() => {
    const tagRaw = Number(searchParams.get('tag'));
    const sortRaw = searchParams.get('sort');
    return {
      tag: Number.isInteger(tagRaw) && tagRaw > 0 ? tagRaw : undefined,
      q: searchParams.get('q')?.trim() || undefined,
      sort: sortRaw === 'created' ? 'created' : 'activity',
    };
  }, [searchParams]);

  const setQuery = useCallback(
    (patch: Partial<ThreadsQuery>) => {
      const next = { ...query, ...patch };
      const params = new URLSearchParams();
      if (next.tag) params.set('tag', String(next.tag));
      if (next.q) params.set('q', next.q);
      if (next.sort !== 'activity') params.set('sort', next.sort);
      const search = params.toString();
      router.replace(search ? `${pathname}?${search}` : pathname, { scroll: false });
    },
    [query, router, pathname],
  );

  return { query, setQuery };
}
