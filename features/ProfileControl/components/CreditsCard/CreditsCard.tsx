import { Button } from 'antd';
import { CURRENCY_NAME } from '@/shared/constants';
import { HudCard } from '@ui/HudCard';
import { CreditsAmount } from '@ui/CreditsAmount';
import type { CreditsCardProps } from './types';
import styles from './CreditsCard.module.scss';

export function CreditsCard({ balance, onOpenHistory, onGoShowcase }: CreditsCardProps) {
  return (
    <HudCard title={CURRENCY_NAME}>
      <div className={styles.tile}>
        <span className={styles.tileLabel}>Баланс</span>
        <CreditsAmount value={balance} size="lg" />
      </div>
      <div className={styles.actions}>
        <Button type="primary" block onClick={onGoShowcase}>
          В витрину
        </Button>
        <Button block onClick={onOpenHistory}>
          История операций
        </Button>
      </div>
    </HudCard>
  );
}
