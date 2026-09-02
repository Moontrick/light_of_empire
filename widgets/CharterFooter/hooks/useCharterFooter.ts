'use client';

import { useEffect, useMemo } from 'react';
import { usePagesStore } from '@store/pagesStore';
import { buildFooterColumns } from '../lib/buildFooterColumns';
import { FOOTER_COMMUNITY_COLUMN, FOOTER_MAIN_COLUMN } from '../constants';

export function useCharterFooter() {
  const tree = usePagesStore((state) => state.tree);
  const treeStatus = usePagesStore((state) => state.treeStatus);
  const fetchTree = usePagesStore((state) => state.fetchTree);

  useEffect(() => {
    if (usePagesStore.getState().treeStatus === 'idle') {
      void fetchTree();
    }
  }, [fetchTree]);

  const loading = treeStatus === 'idle' || treeStatus === 'loading';

  // При ошибке дерева футер молча остаётся со статичными колонками
  const columns = useMemo(
    () =>
      treeStatus === 'ready'
        ? buildFooterColumns(tree)
        : [FOOTER_MAIN_COLUMN, FOOTER_COMMUNITY_COLUMN],
    [tree, treeStatus],
  );

  return { columns, loading };
}
