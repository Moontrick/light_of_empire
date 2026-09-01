'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from '@hooks/useMediaQuery';
import { usePathname } from '@/shared/i18n/navigation';
import { usePagesStore } from '@store/pagesStore';
import { buildCompactNav } from '../lib/buildCompactNav';
import { buildPagesNav } from '../lib/buildPagesNav';
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

  const tree = usePagesStore((state) => state.tree);
  const treeStatus = usePagesStore((state) => state.treeStatus);
  const fetchTree = usePagesStore((state) => state.fetchTree);

  useEffect(() => {
    if (usePagesStore.getState().treeStatus === 'idle') {
      void fetchTree();
    }
  }, [fetchTree]);

  // Пока дерево грузится — только статичные пункты, без скелетонов
  const fullNav = useMemo(
    () => (treeStatus === 'ready' ? [...NAV_ITEMS, ...buildPagesNav(tree)] : NAV_ITEMS),
    [tree, treeStatus],
  );

  const navItems = useMemo(
    () =>
      isCompact
        ? buildCompactNav(fullNav, COMPACT_VISIBLE_COUNT, MORE_LABEL, MORE_HREF)
        : fullNav,
    [isCompact, fullNav],
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

  return { open, toggle, close, activePath, navItems, mobileItems: fullNav };
}
