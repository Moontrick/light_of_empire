import type { CurrencyParticipant, CurrencyTransaction } from '@/shared/types';

// Строка таблицы: своя история — без user/actor, общий журнал — с ними
export type TransactionsTableRow = CurrencyTransaction & {
  user?: CurrencyParticipant;
  actor?: CurrencyParticipant | null;
};

export interface TransactionsTableProps {
  items: TransactionsTableRow[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  // true — колонки «Получатель» и «Оператор» (общий журнал)
  withParticipants?: boolean;
  onPageChange: (page: number) => void;
}
