import { useMemo } from 'react';
import { dayjs, type Dayjs } from '@utils/dayjs';
import type { PurchaseStatus } from '@/shared/types';
import type { FilterOptionEntity, PurchasesFiltersProps } from '../types';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const toOptions = (entities?: FilterOptionEntity[]) =>
  (entities ?? []).map((entity) => ({ value: entity.id, label: entity.label }));

export function usePurchasesFilters({ value, onChange, users, donations }: PurchasesFiltersProps) {
  const range = useMemo<[Dayjs, Dayjs] | null>(
    () => (value.from && value.to ? [dayjs(value.from), dayjs(value.to)] : null),
    [value.from, value.to],
  );
  const userOptions = useMemo(() => toOptions(users), [users]);
  const donationOptions = useMemo(() => toOptions(donations), [donations]);

  // Период — целые дни в локальном времени пользователя, на сервер уходит ISO с зоной
  const onRangeChange = (dates: RangeValue) => {
    const [from, to] = dates ?? [null, null];
    onChange({
      ...value,
      from: from ? from.startOf('day').toISOString() : null,
      to: to ? to.endOf('day').toISOString() : null,
    });
  };

  const onStatusChange = (status: PurchaseStatus | '') =>
    onChange({ ...value, status: status || null });
  const onUserChange = (userId?: number) => onChange({ ...value, userId: userId ?? null });
  const onDonationChange = (donationId?: number) =>
    onChange({ ...value, donationId: donationId ?? null });

  return { range, userOptions, donationOptions, onRangeChange, onStatusChange, onUserChange, onDonationChange };
}
