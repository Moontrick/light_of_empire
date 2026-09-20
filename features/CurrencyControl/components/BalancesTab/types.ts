import type { UserListItem } from '@/shared/api/users';

export interface BalancesTabProps {
  users: UserListItem[];
  loading: boolean;
  canCredit: boolean;
  canViewJournal: boolean;
  onBalanceChanged: (userId: number, balance: number) => void;
  onOpenHistory: (userId: number) => void;
}
