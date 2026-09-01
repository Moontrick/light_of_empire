import { UserRole } from '@/shared/types';
import type { CabinetNavSection } from './types';

export const CABINET_NAV_SECTIONS: CabinetNavSection[] = [
  {
    items: [
      { label: 'Профиль', href: '/profile' },
      { label: 'Формирования', href: '/formations' },
      { label: 'Должности', href: '/positions' },
    ],
  },
  {
    title: 'Администрирование',
    minRole: UserRole.ADMIN,
    items: [
      { label: 'Пользователи', href: '/admin/users' },
      { label: 'Новости', href: '/admin/news' },
      { label: 'Структура', href: '/admin/structure' },
    ],
  },
];
