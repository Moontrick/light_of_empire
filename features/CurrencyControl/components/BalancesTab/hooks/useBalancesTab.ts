import { useState } from 'react';
import type { UserListItem } from '@/shared/api/users';
import type { AdjustMode, AdjustTarget } from '@features/CurrencyControl/types';

export function useBalancesTab() {
  const [adjusting, setAdjusting] = useState<AdjustTarget | null>(null);

  const openAdjust = (user: UserListItem, mode: AdjustMode) => setAdjusting({ user, mode });
  const closeAdjust = () => setAdjusting(null);

  return { adjusting, openAdjust, closeAdjust };
}
