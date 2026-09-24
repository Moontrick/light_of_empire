import type { CaseReward } from '../../types';

export interface RewardModalProps {
  // null — модалка закрыта
  reward: CaseReward | null;
  itemWidth: number;
  itemHeight: number;
  onClose: () => void;
}
