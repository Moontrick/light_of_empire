import { UserRole } from '@/shared/types';
import type { CabinetNavSection } from './types';

export const CABINET_NAV_SECTIONS: CabinetNavSection[] = [
  {
    items: [
      { label: 'Профиль', href: '/profile' },
      { label: 'Мои покупки', href: '/purchases' },
      { label: 'Формирования', href: '/formations' },
      { label: 'Должности', href: '/positions' },
    ],
  },
  {
    title: 'Администрирование',
    minRole: UserRole.ADMIN,
    items: [
      { label: 'Пользователи', href: '/admin/users' },
      { label: 'Кредиты', href: '/admin/currency', minRole: UserRole.CURATOR },
      { label: 'Покупка доната', href: '/admin/purchases', minRole: UserRole.CURATOR },
      { label: 'Донат', href: '/admin/donations', minRole: UserRole.OWNER },
      { label: 'Новости', href: '/admin/news' },
      { label: 'Боевые операции', href: '/admin/combat-operations' },
      { label: 'Структура', href: '/admin/structure' },
      { label: 'Настройки бота', href: '/admin/discord-bot', minRole: UserRole.OWNER },
    ],
  },
];
