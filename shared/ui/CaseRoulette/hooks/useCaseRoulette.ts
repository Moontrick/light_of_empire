import { animate, useMotionValue, useTransform } from 'framer-motion';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CaseReward, CaseSpinTarget, VisualItem } from '../types';
import {
  ITEMS_AFTER_WIN,
  ITEMS_BEFORE_WIN,
  OVERSHOOT_RATIO,
  SETTLE_SPRING,
  SPIN_EASE,
} from '../constants';
import type { UseCaseRouletteParams } from './types';

function isValidTarget({ items, winningPosition }: CaseSpinTarget) {
  return winningPosition >= 0 && winningPosition < items.length;
}

export function useCaseRoulette({
  items,
  winningPosition,
  itemWidth,
  gap,
  duration,
  onStart,
  onFinish,
  itemsNode,
  disabled = false,
}: UseCaseRouletteParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  // Приз для модалки; null — модалка закрыта
  const [reward, setReward] = useState<CaseReward | null>(null);
  // Визуальный индекс ячейки под маркером после остановки — для подсветки
  const [landedIndex, setLandedIndex] = useState<number | null>(null);

  // Анимируем не x, а смещение ленты от её начала до маркера: оно не зависит
  // от ширины контейнера. x пересчитывается из живой ширины, поэтому ресайз
  // в любой момент, даже посреди прокрута, оставляет победителя под маркером.
  const offset = useMotionValue(itemWidth / 2);
  const viewportWidth = useMotionValue(0);
  const x = useTransform(
    [offset, viewportWidth],
    ([currentOffset, width]: number[]) => width / 2 - currentOffset,
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    viewportWidth.set(container.offsetWidth);
    const observer = new ResizeObserver(([entry]) => {
      viewportWidth.set(entry.contentRect.width);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [viewportWidth]);

  const visualItems = useMemo<VisualItem[]>(() => {
    if (!items.length) return [];

    return Array.from({ length: ITEMS_BEFORE_WIN + items.length + ITEMS_AFTER_WIN }, (_, index) => {
      // Предметы после ITEMS_BEFORE_WIN идут в исходном порядке, чтобы
      // выигрышный оказался ровно на позиции ITEMS_BEFORE_WIN + winningPosition
      const sourceIndex =
        index < ITEMS_BEFORE_WIN ? index % items.length : (index - ITEMS_BEFORE_WIN) % items.length;

      return { value: items[sourceIndex], visualIndex: index };
    });
  }, [items]);

  const spinTo = async (target: CaseSpinTarget) => {
    if (!isValidTarget(target)) return;

    const step = itemWidth + gap;
    const winningIndex = ITEMS_BEFORE_WIN + target.winningPosition;
    const targetOffset = winningIndex * step + itemWidth / 2;
    const overshootOffset = targetOffset + step * OVERSHOOT_RATIO;

    // Каждый прокрут стартует с начала ленты, иначе повторный почти не двигается
    offset.set(itemWidth / 2);
    await animate(offset, overshootOffset, { duration, ease: [...SPIN_EASE] });
    await animate(offset, targetOffset, SETTLE_SPRING);

    const value = target.items[target.winningPosition];
    setLandedIndex(winningIndex);
    onFinish?.(value);

    // Проверяем по наличию записи, а не по значению: id предмета может быть 0
    const node = itemsNode?.[value];
    if (node) {
      setReward({ value, node });
    }
  };

  const start = async () => {
    if (isSpinning || !canSpin) return;

    setIsSpinning(true);
    setLandedIndex(null);
    try {
      const target = onStart ? await onStart() : { items, winningPosition };
      await spinTo(target);
    } finally {
      setIsSpinning(false);
    }
  };

  const closeReward = () => setReward(null);

  // Без onStart крутим по пропсам, поэтому они должны указывать на победителя
  const canSpin = !disabled && (Boolean(onStart) || isValidTarget({ items, winningPosition }));

  return {
    containerRef,
    x,
    visualItems,
    isSpinning,
    canSpin,
    landedIndex,
    start,
    reward,
    closeReward,
  };
}
