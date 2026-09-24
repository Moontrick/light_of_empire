import type { ReactNode } from 'react';

export interface LinkedAccountRowProps {
  icon: ReactNode;
  name: string;
  // null / пустая строка — сервис не привязан
  value: string | null;
  // Внешняя ссылка на профиль сервиса, если есть
  href?: string | null;
  onEdit: () => void;
}
