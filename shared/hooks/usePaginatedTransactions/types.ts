import type { AxiosResponse } from 'axios';
import type { PaginatedResponse, TransactionsQuery } from '@/shared/api/currency';
import type { TransactionsFilterValues } from '@/shared/types';

export type TransactionsFetcher<T> = (
  query: TransactionsQuery,
) => Promise<AxiosResponse<PaginatedResponse<T>>>;

export interface UsePaginatedTransactionsOptions {
  // false — не грузить (модалка закрыта); при переходе в true грузится текущая страница
  enabled?: boolean;
  initialFilters?: Partial<TransactionsFilterValues>;
}
