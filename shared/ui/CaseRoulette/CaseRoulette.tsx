'use client';

import { Button } from 'antd';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';
import { HudCorners } from '@ui/HudCorners';
import { CreditsAmount } from '@ui/CreditsAmount';
import { CaseItem } from './components/CaseItem';
import { RewardModal } from './components/RewardModal';
import { useCaseRoulette } from './hooks/useCaseRoulette';
import { DEFAULT_DURATION, DEFAULT_GAP, DEFAULT_ITEM_WIDTH } from './constants';
import type { CaseRouletteProps } from './types';
import styles from './CaseRoulette.module.scss';

export function CaseRoulette({
  items,
  winningPosition,
  itemWidth = DEFAULT_ITEM_WIDTH,
  itemHeight = itemWidth,
  gap = DEFAULT_GAP,
  duration = DEFAULT_DURATION,
  itemsNode = null,
  onStart,
  onFinish,
  price,
  disabled,
}: CaseRouletteProps) {
  const { containerRef, x, visualItems, isSpinning, canSpin, landedIndex, start, reward, closeReward } =
    useCaseRoulette({
      items,
      winningPosition,
      itemWidth,
      gap,
      duration,
      onStart,
      onFinish,
      itemsNode,
      disabled,
    });

  const sizeVars = {
    '--case-item-width': `${itemWidth}px`,
    '--case-item-height': `${itemHeight}px`,
    '--case-gap': `${gap}px`,
  } as CSSProperties;

  return (
    <div className={styles.root} style={sizeVars}>
      <div className={classNames(styles.frame, isSpinning && styles.spinning)}>
        <HudCorners />
        <span className={classNames(styles.pointer, styles.pointerTop)} aria-hidden />
        <span className={classNames(styles.pointer, styles.pointerBottom)} aria-hidden />
        <div className={styles.marker} aria-hidden />
        <div ref={containerRef} className={styles.viewport}>
          <motion.div className={styles.track} style={{ x }}>
            {visualItems.map((item) => (
              <div
                key={item.visualIndex}
                className={classNames(styles.slot, item.visualIndex === landedIndex && styles.win)}
              >
                <CaseItem value={item.value} node={itemsNode?.[item.value]} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <Button
        type="primary"
        size="large"
        className={styles.spin}
        loading={isSpinning}
        disabled={!canSpin}
        onClick={start}
      >
        {isSpinning ? (
          'Открываем…'
        ) : (
          <>
            <span>Открыть кейс</span>
            <span className={styles.spinPrice}>
              <CreditsAmount value={price} size="sm" />
            </span>
          </>
        )}
      </Button>

      <RewardModal reward={reward} itemWidth={itemWidth} itemHeight={itemHeight} onClose={closeReward} />
    </div>
  );
}
