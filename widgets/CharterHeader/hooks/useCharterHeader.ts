'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { usePathname } from '@/shared/i18n/navigation';
import { buildCompactNav } from '../lib/buildCompactNav';
import {
  COMPACT_QUERY,
  COMPACT_VISIBLE_COUNT,
  MOBILE_QUERY,
  MORE_HREF,
  MORE_LABEL,
  NAV_ITEMS,
} from '../constants';

export function useCharterHeader() {
  const [open, setOpen] = useState(false);
  const activePath = usePathname();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const isCompact = useMediaQuery(COMPACT_QUERY);

  const navItems = useMemo(
    () =>
      isCompact
        ? buildCompactNav(NAV_ITEMS, COMPACT_VISIBLE_COUNT, MORE_LABEL, MORE_HREF)
        : NAV_ITEMS,
    [isCompact],
  );

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

  return { open, toggle, close, activePath, navItems };
}
