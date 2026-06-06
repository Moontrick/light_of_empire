import { ReactNode } from 'react';

export type LayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};
