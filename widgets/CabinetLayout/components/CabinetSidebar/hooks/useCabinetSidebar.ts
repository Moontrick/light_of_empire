import { useMemo } from 'react';
import { usePathname } from '@/shared/i18n/navigation';
import { useAuthStore } from '@store/authStore';
import { hasRoleAtLeast } from '@/shared/types';
import { CABINET_NAV_SECTIONS } from '../../../constants';

// Вложенные маршруты (/admin/news/new) подсвечивают родительский пункт
function isActiveItem(activePath: string, href: string): boolean {
  return activePath === href || activePath.startsWith(`${href}/`);
}

export function useCabinetSidebar() {
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);
  const activePath = usePathname();

  const pending = status === 'idle' || status === 'loading';

  const sections = useMemo(
    () =>
      CABINET_NAV_SECTIONS.filter(
        (section) => !section.minRole || hasRoleAtLeast(user?.role, section.minRole),
      ).map((section) => ({
        ...section,
        items: section.items
          .filter((item) => !item.minRole || hasRoleAtLeast(user?.role, item.minRole))
          .map((item) => ({ ...item, active: isActiveItem(activePath, item.href) })),
      })),
    [user?.role, activePath],
  );

  return { user, pending, sections };
}
