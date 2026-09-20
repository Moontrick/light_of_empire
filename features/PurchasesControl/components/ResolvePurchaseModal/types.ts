import type { ResolveTarget } from '@features/PurchasesControl/types';

export interface ResolvePurchaseModalProps {
  // null — модалка закрыта
  target: ResolveTarget | null;
  onClose: () => void;
  // После успеха и после 409 — список перечитывается
  onResolved: () => void;
}

export interface ResolveFormValues {
  resolution_comment?: string;
}
