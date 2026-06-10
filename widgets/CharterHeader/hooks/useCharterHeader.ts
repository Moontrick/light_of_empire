'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { usePathname } from '@/shared/i18n/navigation';
import { MOBILE_QUERY } from '../constants';

export function useCharterHeader() {
  const [open, setOpen] = useState(false);
  const activePath = usePathname();
  const isMobile = useMediaQuery(MOBILE_QUERY);

  const toggle = useCallback(() => setOpen((value) => !value), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [activePath]);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previous;
    };
  }, [open]);

  return { open, toggle, close, activePath };
}
