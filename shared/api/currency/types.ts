import type { CurrencyTransaction, CurrencyTransactionType, PaginatedResponse } from '@/shared/types';

export type { PaginatedResponse };

export interface AdjustBalanceDto {
  amount: number;
  message: string;
}

export interface MyTransactionsQuery {
  page?: number;
  limit?: number;
  type?: CurrencyTransactionType;
  from?: string; // ISO с зоной
  to?: string;
}

export interface TransactionsQuery extends MyTransactionsQuery {
  user_id?: number;
  actor_id?: number;
}

// Ответ credit/debit — созданная запись журнала с коротким user (без email)
export interface AdjustBalanceResponse extends CurrencyTransaction {
  user: { id: number; login: string };
}

export interface BalanceResponse {
  balance: number;
}
