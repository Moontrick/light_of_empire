import { useEffect } from 'react';
import { useRouter } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast, UserRole } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';

export function useRoleGuard(minRole?: UserRole) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);

  const pending = status === 'idle' || status === 'loading';
  const allowed = !!user && (!minRole || hasRoleAtLeast(user.role, minRole));

  useEffect(() => {
    if (status === 'guest') {
      router.replace('/login');
      return;
    }

    if (status === 'authenticated' && user && minRole && !hasRoleAtLeast(user.role, minRole)) {
      alertHandler.addAlert({ status: 'warning', defaultText: 'Недостаточно прав' });
      router.replace('/profile');
    }
  }, [status, user, minRole, router]);

  return { pending, allowed };
}
