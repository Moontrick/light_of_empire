import { useMemo } from 'react';
import { dayjs, type Dayjs } from '@utils/dayjs';
import type { CurrencyTransactionType } from '@/shared/types';
import type { TransactionsFiltersProps } from '../types';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export function useTransactionsFilters({ value, onChange, users }: TransactionsFiltersProps) {
  const range = useMemo<[Dayjs, Dayjs] | null>(
    () => (value.from && value.to ? [dayjs(value.from), dayjs(value.to)] : null),
    [value.from, value.to],
  );

  const userOptions = useMemo(
    () => (users ?? []).map((user) => ({ value: user.id, label: user.login })),
    [users],
  );

  // Период — целые дни в локальном времени пользователя, на сервер уходит ISO с зоной
  const onRangeChange = (dates: RangeValue) => {
    const [from, to] = dates ?? [null, null];
    onChange({
      ...value,
      from: from ? from.startOf('day').toISOString() : null,
      to: to ? to.endOf('day').toISOString() : null,
    });
  };

  const onTypeChange = (type: CurrencyTransactionType | '') =>
    onChange({ ...value, type: type || null });

  const onUserChange = (userId?: number) => onChange({ ...value, userId: userId ?? null });

  const onActorChange = (actorId?: number) => onChange({ ...value, actorId: actorId ?? null });

  return { range, userOptions, onRangeChange, onTypeChange, onUserChange, onActorChange };
}
