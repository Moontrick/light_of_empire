import type { AxiosResponse } from 'axios';
import type { PaginatedResponse } from '@/shared/types';

export type PaginatedFetcher<T, Q> = (query: Q) => Promise<AxiosResponse<PaginatedResponse<T>>>;

export interface UsePaginatedListOptions<F> {
  initialFilters: F;
  // false — не грузить (модалка закрыта); при переходе в true грузится текущая страница
  enabled?: boolean;
  limit?: number;
}

export interface UsePaginatedListResult<T, F> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  loading: boolean;
  filters: F;
  setFilters: (next: F) => void;
  setPage: (page: number) => void;
  reload: () => Promise<void>;
  reset: () => void;
}
