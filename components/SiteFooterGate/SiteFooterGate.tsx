'use client';

import { usePathname } from '@/shared/i18n/navigation';
import type { SiteFooterGateProps } from './types';

// В кабинете и админке свой сайдбар, сайтовый футер там не нужен
const CABINET_PREFIXES = ['/profile', '/purchases', '/admin', '/formations', '/positions'];

export function SiteFooterGate({ children }: SiteFooterGateProps) {
  const pathname = usePathname();

  if (CABINET_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return <>{children}</>;
}
