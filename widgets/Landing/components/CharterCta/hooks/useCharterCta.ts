'use client';

import { useEffect, useMemo } from 'react';
import { usePagesStore } from '@store/pagesStore';
import { publishedNodes } from '@/shared/utils/pagesTree';
import { CTA_DYNAMIC_COUNT, CTA_DYNAMIC_EYEBROW, CTA_DYNAMIC_LABEL } from '../constants';
import type { CtaCardData } from '../types';

const IMAGES: string[] = [
  '/images/2d9aca9c6ce189ebb8b59a9088c033d4.jpg',
  '/images/43e9a05974ecb9a83c9901cf0e40a634.png'
];
export function useCharterCta() {
  const tree = usePagesStore((state) => state.tree);
  const treeStatus = usePagesStore((state) => state.treeStatus);
  const fetchTree = usePagesStore((state) => state.fetchTree);
  const summaries = usePagesStore((state) => state.summaries);
  const fetchSummaries = usePagesStore((state) => state.fetchSummaries);

  useEffect(() => {
    if (usePagesStore.getState().treeStatus === 'idle') {
      void fetchTree();
    }
  }, [fetchTree]);

  const nodes = useMemo(
    () => (treeStatus === 'ready' ? publishedNodes(tree).slice(0, CTA_DYNAMIC_COUNT) : []),
    [tree, treeStatus],
  );

  useEffect(() => {
    if (nodes.length > 0) {
      void fetchSummaries(nodes.map((node) => node.slug));
    }
  }, [nodes, fetchSummaries]);

  const treeLoading = treeStatus === 'idle' || treeStatus === 'loading';
  // Показываем все динамические карточки разом, чтобы они не прыгали по мере загрузки
  const summariesReady = nodes.every((node) => node.slug in summaries);

  const dynamicCards = useMemo<CtaCardData[]>(() => {
    if (!summariesReady) return [];
    // console.log(nodes);
    return nodes.map((node, index) => {
      const summary = summaries[node.slug] ?? null;
      return {
        id: node.slug,
        eyebrow: summary?.eyebrow || CTA_DYNAMIC_EYEBROW,
        title: node.name,
        text: summary?.intro ?? '',
        href: `/${node.slug}`,
        ctaLabel: CTA_DYNAMIC_LABEL,
        image: IMAGES[index] ?? '',
      };
    });
  }, [nodes, summaries, summariesReady]);

  const skeletonCount = treeLoading ? CTA_DYNAMIC_COUNT : summariesReady ? 0 : nodes.length;

  return { dynamicCards, skeletonCount };
}
