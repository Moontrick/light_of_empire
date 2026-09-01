import type { ReactNode } from 'react';

export interface HudCardProps {
  title?: string;
  // Действие в правом углу заголовка (кнопка и т.п.)
  extra?: ReactNode;
  children: ReactNode;
}
