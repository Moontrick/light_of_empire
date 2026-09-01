import type { ReactNode } from 'react';
import type { UserRole } from '@/shared/types';

export interface CabinetLayoutProps {
  children: ReactNode;
  // Широкие экраны (таблицы) — без ограничения ширины контента
  wide?: boolean;
}

export interface CabinetNavItem {
  label: string;
  href: string;
}

export interface CabinetNavSection {
  title?: string;
  minRole?: UserRole;
  items: CabinetNavItem[];
}
