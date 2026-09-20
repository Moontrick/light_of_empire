'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { CURRENCY_NAME } from '@/shared/constants';
import { HudCard } from '@ui/HudCard';
import { CreditsAmount } from '@ui/CreditsAmount';
import { TransactionsModal } from './components/TransactionsModal';
import type { CreditsCardProps } from './types';
import styles from './CreditsCard.module.scss';

export function CreditsCard({ balance }: CreditsCardProps) {
  const [historyOpen, setHistoryOpen] = useState(false);

  return (
    <HudCard
      title={CURRENCY_NAME}
      extra={<Button onClick={() => setHistoryOpen(true)}>История операций</Button>}
    >
      <div className={styles.tile}>
        <span className={styles.tileLabel}>Баланс</span>
        <CreditsAmount value={balance} size="lg" />
      </div>
      {/* <span className={styles.hint}>Кредиты начисляет командование</span> */}
      <TransactionsModal open={historyOpen} onClose={() => setHistoryOpen(false)} />
    </HudCard>
  );
}
