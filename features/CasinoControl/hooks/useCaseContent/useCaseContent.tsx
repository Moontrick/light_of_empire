import { useState } from 'react';
import { useAuthStore } from '@store/authStore';

export function useCaseContent() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const [activeCaseId, setActiveCaseId] = useState<number | null>(null);

  return {
    activeCaseId,
    balance: user?.balance ?? 0,
    pending: status === 'idle' || status === 'loading',
    guest: status === 'guest',
    handleOpenCase: (caseId: number) => setActiveCaseId(caseId),
    handleBack: () => setActiveCaseId(null),
  };
}
