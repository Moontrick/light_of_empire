import type { ResolveStatus } from '@/shared/api/purchases';
import type { PurchaseFull } from '@/shared/types';

export interface ResolveTarget {
  purchase: PurchaseFull;
  status: ResolveStatus;
}
