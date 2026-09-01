import type { ReactNode } from 'react';
import type { UserRole } from '@/shared/types';

export interface RoleGuardProps {
  minRole?: UserRole;
  children: ReactNode;
}
