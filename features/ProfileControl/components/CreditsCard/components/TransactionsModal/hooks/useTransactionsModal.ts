import { currencyApi } from '@/shared/api/currency';
import { usePaginatedTransactions } from '@hooks/usePaginatedTransactions';

// Грузим только пока модалка открыта; после закрытия сбрасываем фильтры и страницу
export function useTransactionsModal(open: boolean) {
  return usePaginatedTransactions(currencyApi.getMyTransactions, { enabled: open });
}
