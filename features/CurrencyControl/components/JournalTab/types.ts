import type { TransactionsFilterUser } from '@ui/TransactionsFilters';
import type { HistoryRequest } from '@features/CurrencyControl/types';

export interface JournalTabProps {
  users: TransactionsFilterUser[];
  usersLoading: boolean;
  // Запрос «История» с вкладки «Балансы»; null — без предзаполнения. seq растёт при каждом нажатии, даже для того же пользователя
  historyRequest: HistoryRequest | null;
  // Растёт после каждой операции на «Балансах» — сигнал перечитать список
  dataVersion: number;
}
