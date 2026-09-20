import { useMemo } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { purchasesApi } from '@/shared/api/purchases';
import type { MyPurchasesQuery, PurchaseDto } from '@/shared/api/purchases';
import { usePaginatedList } from '@hooks/usePaginatedList';
import { EMPTY_PURCHASE_FILTERS } from '@ui/PurchasesFilters';
import type { PurchasesFilterValues } from '@ui/PurchasesFilters';
import { mapPurchaseDto } from '@/shared/utils/mapPurchase';

function toMyQuery(filters: PurchasesFilterValues, page: number, limit: number): MyPurchasesQuery {
  return { page, limit, status: filters.status ?? undefined };
}

export function useMyPurchases() {
  const router = useRouter();
  const list = usePaginatedList<PurchaseDto, PurchasesFilterValues, MyPurchasesQuery>(
    purchasesApi.getMy,
    toMyQuery,
    { initialFilters: EMPTY_PURCHASE_FILTERS },
  );
  const items = useMemo(() => list.items.map(mapPurchaseDto), [list.items]);
  const goShowcase = () => router.push('/donations');

  return { ...list, items, goShowcase };
}
