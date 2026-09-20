import { useState } from 'react';
import { useAuthStore } from '@store/authStore';
import type { DonationDetail } from '@/shared/types';

export function usePurchasePanel(donation: DonationDetail) {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);

  const shortage = user ? Math.max(0, donation.price - user.balance) : 0;

  return {
    pending: status === 'idle' || status === 'loading',
    guest: status === 'guest',
    steamMissing: Boolean(user) && !user?.steam_url,
    shortage,
    modalOpen,
    openModal: () => setModalOpen(true),
    closeModal: () => setModalOpen(false),
  };
}
