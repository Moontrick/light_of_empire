import type { TransactionsFilterValues } from '@/shared/types';

export interface TransactionsFilterUser {
  id: number;
  login: string;
}

export interface TransactionsFiltersProps {
  value: TransactionsFilterValues;
  onChange: (value: TransactionsFilterValues) => void;
  // Список для селектов «Получатель»/«Оператор»; без него селекты не рендерятся
  users?: TransactionsFilterUser[];
  usersLoading?: boolean;
}
