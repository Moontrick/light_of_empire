import type { UserProfile } from '@/shared/types';
import type { AccountField } from '../../types';

export interface ProfileHeroProps {
  user: UserProfile;
  transactionsTotal: number;
  purchasesTotal: number;
  loading: boolean;
  onEditAccount: (field: AccountField) => void;
}
