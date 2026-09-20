import type { PurchaseStatus } from '@/shared/types';

export interface PurchasesFilterValues {
  status: PurchaseStatus | null;
  userId: number | null;
  donationId: number | null;
  from: string | null; // ISO с зоной
  to: string | null;
}

export interface FilterOptionEntity {
  id: number;
  label: string;
}

export interface PurchasesFiltersProps {
  value: PurchasesFilterValues;
  onChange: (value: PurchasesFilterValues) => void;
  // Без списков селекты покупателя/товара не рендерятся (кабинет)
  users?: FilterOptionEntity[];
  usersLoading?: boolean;
  donations?: FilterOptionEntity[];
  donationsLoading?: boolean;
}
