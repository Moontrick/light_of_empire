'use client';

import { useCallback, useState } from 'react';
import { usePathname } from '@/shared/i18n/navigation';

export function useCharterHeader() {
  const [open, setOpen] = useState(false);
  const activePath = usePathname();

  const toggle = useCallback(() => setOpen((value) => !value), []);
  const close = useCallback(() => setOpen(false), []);

  return { open, toggle, close, activePath };
}
