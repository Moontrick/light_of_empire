'use client';

import { Skeleton } from 'antd';
import { CreditsAmount } from '@ui/CreditsAmount';
import type { BalanceChipProps } from './types';
import styles from './BalanceChip.module.scss';

export function BalanceChip({ balance, pending, guest, guestText }: BalanceChipProps) {
  if (pending) {
    return <Skeleton.Input active size="small" />;
  }

  if (guest) {
    return guestText ? <span className={styles.note}>{guestText}</span> : null;
  }

  return (
    <div className={styles.root}>
      <span className={styles.label}>Баланс</span>
      <CreditsAmount value={balance} size="md" />
    </div>
  );
}
