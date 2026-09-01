'use client';

import { usePathname } from '@/shared/i18n/navigation';
import type { SiteFooterGateProps } from './types';

// Кабинет и админка — app-shell со своим сайдбаром, сайтовый футер там не нужен
const CABINET_PREFIXES = ['/profile', '/admin', '/formations'];

export function SiteFooterGate({ children }: SiteFooterGateProps) {
  const pathname = usePathname();

  if (CABINET_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return <>{children}</>;
}
