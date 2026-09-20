import type { TransactionsQuery } from '@/shared/api/currency';
import type { TransactionsFilterValues } from '@/shared/types';
import { usePaginatedList } from '@hooks/usePaginatedList';
import type { TransactionsFetcher, UsePaginatedTransactionsOptions } from './types';

const PAGE_LIMIT = 20;

export const EMPTY_TRANSACTION_FILTERS: TransactionsFilterValues = {
  type: null,
  from: null,
  to: null,
  userId: null,
  actorId: null,
};

function toTransactionsQuery(
  filters: TransactionsFilterValues,
  page: number,
  limit: number,
): TransactionsQuery {
  return {
    page,
    limit,
    type: filters.type ?? undefined,
    from: filters.from ?? undefined,
    to: filters.to ?? undefined,
    user_id: filters.userId ?? undefined,
    actor_id: filters.actorId ?? undefined,
  };
}

export function usePaginatedTransactions<T>(
  fetcher: TransactionsFetcher<T>,
  options: UsePaginatedTransactionsOptions = {},
) {
  const { enabled, initialFilters } = options;
  return usePaginatedList<T, TransactionsFilterValues, TransactionsQuery>(
    fetcher,
    toTransactionsQuery,
    {
      initialFilters: { ...EMPTY_TRANSACTION_FILTERS, ...initialFilters },
      enabled,
      limit: PAGE_LIMIT,
    },
  );
}
