'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { fitNavItems } from '../lib/fitNavItems';

interface UseNavOverflowOptions {
  itemCount: number;
  minVisible: number;
  // false — на мобильном меню в бургере, измерять нечего
  enabled: boolean;
}

// Меряем не видимое меню, а его скрытую «тень» со всеми пунктами и «Прочее»:
// тень не зависит от результата сворачивания, поэтому нет циклов перерисовки
export function useNavOverflow({ itemCount, minVisible, enabled }: UseNavOverflowOptions) {
  const containerRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLUListElement>(null);
  const [visibleCount, setVisibleCount] = useState(itemCount);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const ghost = ghostRef.current;
    if (!enabled || !container || !ghost) return;

    const measure = () => {
      const nodes = Array.from(ghost.children) as HTMLElement[];
      // Последний элемент тени — «Прочее»
      const moreWidth = nodes[nodes.length - 1]?.offsetWidth ?? 0;
      const widths = nodes.slice(0, -1).map((node) => node.offsetWidth);
      const gap = parseFloat(getComputedStyle(ghost).columnGap) || 0;

      setVisibleCount(fitNavItems(widths, gap, moreWidth, container.clientWidth, minVisible));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(ghost);

    return () => observer.disconnect();
  }, [enabled, itemCount, minVisible]);

  return { containerRef, ghostRef, visibleCount: enabled ? visibleCount : itemCount };
}
