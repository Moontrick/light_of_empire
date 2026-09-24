import { HudCard } from '@ui/HudCard';
import { AccountCard } from './components/AccountCard';
import { SecurityCard } from './components/SecurityCard';
import type { AccountSettingsCardProps } from './types';
import styles from './AccountSettingsCard.module.scss';

export function AccountSettingsCard({ onEditAccount }: AccountSettingsCardProps) {
  return (
    <HudCard title="Аккаунт и безопасность">
      <div className={styles.parts}>
        <section className={styles.part}>
          <h3 className={styles.partTitle}>Аккаунт</h3>
          <AccountCard onEdit={onEditAccount} />
        </section>
        <section className={styles.part}>
          <h3 className={styles.partTitle}>Безопасность</h3>
          <SecurityCard />
        </section>
      </div>
    </HudCard>
  );
}
