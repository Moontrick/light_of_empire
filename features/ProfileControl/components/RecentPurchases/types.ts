import type { Purchase } from '@/shared/types';

export interface RecentPurchasesProps {
  items: Purchase[];
  total: number;
  loading: boolean;
  onGoAll: () => void;
  onGoShowcase: () => void;
}
