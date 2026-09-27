import type { ReactNode } from 'react';
import type { UserRole } from '@/shared/types';

export interface CabinetLayoutProps {
  children: ReactNode;
}

export interface CabinetNavItem {
  label: string;
  href: string;
  minRole?: UserRole;
  bandage?: number;
  bandageName?: string;
}

export interface CabinetNavSection {
  title?: string;
  minRole?: UserRole;
  items: CabinetNavItem[];
}
