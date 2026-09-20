import type { Purchase } from '@/shared/types';

export interface PurchasesListProps {
  items: Purchase[];
  loading: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onGoShowcase: () => void;
}
