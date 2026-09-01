import { useMemo, useState } from 'react';
import { usePathname } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { CABINET_NAV_SECTIONS } from '../../../constants';

export function useCabinetSidebar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const activePath = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const sections = useMemo(
    () =>
      CABINET_NAV_SECTIONS.filter(
        (section) => !section.minRole || hasRoleAtLeast(user?.role, section.minRole),
      ),
    [user?.role],
  );

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      alertHandler.addAlert({ status: 'info', defaultText: 'Вы вышли из системы' });
    } finally {
      setLoggingOut(false);
    }
  };

  return { user, sections, activePath, loggingOut, handleLogout };
}
