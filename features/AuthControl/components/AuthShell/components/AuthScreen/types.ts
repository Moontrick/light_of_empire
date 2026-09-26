import type { ReactNode } from 'react';

export interface AuthScreenProps {
  title: string;
  tagline: string;
  footer: ReactNode;
  children: ReactNode;
}
