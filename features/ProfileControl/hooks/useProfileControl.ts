import { useState } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import type { AccountField } from '../types';
import { useProfileActivity } from './useProfileActivity';
import { useProfileRefresh } from './useProfileRefresh';

interface AccountEditState {
  open: boolean;
  focusField?: AccountField;
}

export function useProfileControl() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const activity = useProfileActivity();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [accountEdit, setAccountEdit] = useState<AccountEditState>({ open: false });

  useProfileRefresh();

  return {
    user,
    ...activity,
    historyOpen,
    openHistory: () => setHistoryOpen(true),
    closeHistory: () => setHistoryOpen(false),
    accountEdit,
    openAccountEdit: (focusField?: AccountField) => setAccountEdit({ open: true, focusField }),
    // focusField сохраняем до закрытия — иначе поле теряет фокус в анимации закрытия
    closeAccountEdit: () => setAccountEdit((state) => ({ ...state, open: false })),
    goPurchases: () => router.push('/purchases'),
    goShowcase: () => router.push('/donations'),
  };
}
