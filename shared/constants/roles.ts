import { UserRole } from '@/shared/types';

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.MEMBER]: 'Участник',
  [UserRole.ADMIN]: 'Админ',
  [UserRole.CURATOR]: 'Куратор',
  [UserRole.OWNER]: 'Владелец',
  [UserRole.SUPER_ADMIN]: 'Супер-админ',
};
