import type { CurrencyTransaction } from '@/shared/types';

export interface RecentTransactionsProps {
  items: CurrencyTransaction[];
  total: number;
  loading: boolean;
  onOpenHistory: () => void;
}
