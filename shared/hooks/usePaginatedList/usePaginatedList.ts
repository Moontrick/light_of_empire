import { useCallback, useEffect, useRef, useState } from 'react';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { PaginatedFetcher, UsePaginatedListOptions, UsePaginatedListResult } from './types';

const DEFAULT_LIMIT = 20;

export function usePaginatedList<T, F extends object, Q>(
  fetcher: PaginatedFetcher<T, Q>,
  toQuery: (filters: F, page: number, limit: number) => Q,
  options: UsePaginatedListOptions<F>,
): UsePaginatedListResult<T, F> {
  const { enabled = true, limit = DEFAULT_LIMIT } = options;
  // Начальные фильтры читаются один раз: литерал вызывающей стороны пересоздаётся каждый рендер
  const initialFilters = useRef(options.initialFilters);
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFiltersState] = useState<F>(initialFilters.current);
  const [loading, setLoading] = useState(enabled);
  // Ответ устаревшего запроса (быстро сменили фильтр) не должен перетереть свежий
  const requestId = useRef(0);
  // Ref, а не dep: inline-fetcher/toQuery вызывающей стороны не должны перезапускать загрузку каждый рендер
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const toQueryRef = useRef(toQuery);
  toQueryRef.current = toQuery;

  const load = useCallback(async () => {
    const current = ++requestId.current;
    setLoading(true);
    try {
      const { data } = await fetcherRef.current(toQueryRef.current(filters, page, limit));
      if (current !== requestId.current) return;
      setItems(data.items);
      setTotal(data.total);
    } catch (error) {
      if (current !== requestId.current) return;
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    } finally {
      if (current === requestId.current) setLoading(false);
    }
  }, [filters, page, limit]);

  useEffect(() => {
    if (enabled) void load();
  }, [enabled, load]);

  const setFilters = useCallback((next: F) => {
    setFiltersState(next);
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    requestId.current += 1;
    // Новый объект, а не исходная ссылка: иначе при нетронутых фильтрах React не перезапустит загрузку
    setFiltersState({ ...initialFilters.current });
    setPage(1);
    setItems([]);
    setTotal(0);
    setLoading(false);
  }, []);

  return { items, total, page, limit, loading, filters, setFilters, setPage, reload: load, reset };
}
