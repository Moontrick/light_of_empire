import type { UserListItem } from '@/shared/api/users';
import type { AdjustMode } from '@features/CurrencyControl/types';

export interface BalancesTableProps {
  users: UserListItem[];
  loading: boolean;
  canCredit: boolean;
  canViewJournal: boolean;
  onAdjust: (user: UserListItem, mode: AdjustMode) => void;
  onOpenHistory: (userId: number) => void;
}
