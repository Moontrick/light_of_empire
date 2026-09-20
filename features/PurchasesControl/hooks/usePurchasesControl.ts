import { useCallback, useEffect, useMemo, useState } from 'react';
import { donationsApi } from '@/shared/api/donations';
import { purchasesApi } from '@/shared/api/purchases';
import type { PurchaseFullDto, PurchasesQuery, ResolveStatus } from '@/shared/api/purchases';
import { usersApi } from '@/shared/api/users';
import { PurchaseStatus } from '@/shared/types';
import type { PurchaseFull } from '@/shared/types';
import { usePaginatedList } from '@hooks/usePaginatedList';
import { EMPTY_PURCHASE_FILTERS } from '@ui/PurchasesFilters';
import type { FilterOptionEntity, PurchasesFilterValues } from '@ui/PurchasesFilters';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { mapPurchaseFullDto } from '@/shared/utils/mapPurchase';
import type { ResolveTarget } from '../types';

function toQuery(filters: PurchasesFilterValues, page: number, limit: number): PurchasesQuery {
  return {
    page,
    limit,
    status: filters.status ?? undefined,
    user_id: filters.userId ?? undefined,
    donation_id: filters.donationId ?? undefined,
    from: filters.from ?? undefined,
    to: filters.to ?? undefined,
  };
}

export function usePurchasesControl() {
  const list = usePaginatedList<PurchaseFullDto, PurchasesFilterValues, PurchasesQuery>(
    purchasesApi.getAll,
    toQuery,
    { initialFilters: { ...EMPTY_PURCHASE_FILTERS, status: PurchaseStatus.PENDING } },
  );
  const items = useMemo(() => list.items.map(mapPurchaseFullDto), [list.items]);

  const [users, setUsers] = useState<FilterOptionEntity[]>([]);
  const [donations, setDonations] = useState<FilterOptionEntity[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [resolving, setResolving] = useState<ResolveTarget | null>(null);

  // Справочники для селектов — один раз на фичу; CURATOR получит только активные товары, этого достаточно.
  // allSettled: падение одного запроса не должно опустошать оба селекта
  const loadOptions = useCallback(async () => {
    setOptionsLoading(true);
    try {
      const [usersResult, donationsResult] = await Promise.allSettled([
        usersApi.getUsers(),
        donationsApi.getList(),
      ]);
      if (usersResult.status === 'fulfilled') {
        setUsers(usersResult.value.data.map((user) => ({ id: user.id, label: user.login })));
      } else {
        alertHandler.addAlert({ defaultText: getApiErrorMessage(usersResult.reason) });
      }
      if (donationsResult.status === 'fulfilled') {
        setDonations(
          donationsResult.value.data.map((item) => ({ id: item.id, label: item.title })),
        );
      } else {
        alertHandler.addAlert({ defaultText: getApiErrorMessage(donationsResult.reason) });
      }
    } finally {
      setOptionsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOptions();
  }, [loadOptions]);

  const openResolve = useCallback(
    (purchase: PurchaseFull, status: ResolveStatus) => setResolving({ purchase, status }),
    [],
  );

  return {
    ...list,
    items,
    users,
    donations,
    optionsLoading,
    resolving,
    openResolve,
    closeResolve: () => setResolving(null),
  };
}
