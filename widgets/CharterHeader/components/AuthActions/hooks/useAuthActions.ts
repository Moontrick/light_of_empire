import { useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { alertHandler } from '@/shared/utils/alertHandler';

export function useAuthActions() {
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);
  const logout = useAuthStore((state) => state.logout);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      alertHandler.addAlert({ status: 'info', defaultText: 'Вы вышли из системы' });
    } finally {
      setLoggingOut(false);
    }
  };

  return { user, status, loggingOut, handleLogout };
}
