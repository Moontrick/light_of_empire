import type { CurrencyJournalEntry, CurrencyTransaction } from '@/shared/types';
import { baseService } from '../api';
import { CURRENCY_ROUTES } from './routes';
import type {
  AdjustBalanceDto,
  AdjustBalanceResponse,
  BalanceResponse,
  MyTransactionsQuery,
  PaginatedResponse,
  TransactionsQuery,
} from './types';

export const currencyApi = {
  getMyBalance: () => baseService.get<BalanceResponse>(CURRENCY_ROUTES.ME),

  getMyTransactions: (params: MyTransactionsQuery) =>
    baseService.get<PaginatedResponse<CurrencyTransaction>>(CURRENCY_ROUTES.MY_TRANSACTIONS, {
      params,
    }),

  getTransactions: (params: TransactionsQuery) =>
    baseService.get<PaginatedResponse<CurrencyJournalEntry>>(CURRENCY_ROUTES.TRANSACTIONS, {
      params,
    }),

  credit: (id: number, dto: AdjustBalanceDto) =>
    baseService.post<AdjustBalanceResponse>(CURRENCY_ROUTES.CREDIT(id), dto),

  debit: (id: number, dto: AdjustBalanceDto) =>
    baseService.post<AdjustBalanceResponse>(CURRENCY_ROUTES.DEBIT(id), dto),
};
