import type { ReactNode } from 'react';

export interface AuthShellProps {
  title: string;
  tagline: string;
  footer: ReactNode;
  children: ReactNode;
}
