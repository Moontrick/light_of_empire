import type { ReactNode } from 'react';

export type AuthStep = 'login' | 'register';

export interface AuthShellProps {
  // Ключ экрана для анимации смены; экран подтверждения почты подставляется сам
  step: AuthStep;
  title: string;
  tagline: string;
  footer: ReactNode;
  children: ReactNode;
}
