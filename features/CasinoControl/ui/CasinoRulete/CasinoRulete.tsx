'use client';

import { CaseRoulette } from '@ui/CaseRoulette';
import styles from './CasinoRulete.module.scss';
import { useCasinoControl } from '../../hooks/useCasinoControl';
import type { CasinoRuleteProps } from './types';
import { getRandomIntBetween } from '@/shared/utils/random';

export function CasinoRulete({ placeholders, nodes, price, balance }: CasinoRuleteProps) {
  const { lane, winningPosition, shortage, generateRound, handleFinish } = useCasinoControl({
    placeholders,
    nodes,
    price,
    balance,
  });

  return (
    <div className={styles.root}>
      <CaseRoulette
        items={lane}
        itemsNode={nodes}
        winningPosition={winningPosition}
        onStart={generateRound}
        onFinish={handleFinish}
        duration={getRandomIntBetween(20, 40)}
        price={price}
        disabled={shortage > 0}
      />
      {shortage > 0 && (
        <div className={styles.shortage}>Не хватает {shortage.toLocaleString('ru-RU')} кредитов</div>
      )}
    </div>
  );
}
