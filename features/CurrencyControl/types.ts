import type { UserListItem } from '@/shared/api/users';

export type CurrencyTab = 'balances' | 'journal';

export type AdjustMode = 'credit' | 'debit';

export interface HistoryRequest {
  userId: number;
  seq: number;
}

export interface AdjustTarget {
  user: UserListItem;
  mode: AdjustMode;
}
