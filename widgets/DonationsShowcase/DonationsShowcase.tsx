'use client';

import { Button, Skeleton } from 'antd';
import { DONATIONS_SECTION_TITLE } from '@/shared/constants';
import { DonationCard } from '@ui/DonationCard';
import { BalanceChip } from '@ui/BalanceChip';
import { useDonationsShowcase } from './hooks/useDonationsShowcase';
import styles from './DonationsShowcase.module.scss';

export function DonationsShowcase() {
  const { items, loading, error, empty, retry, balance, authPending, guest } = useDonationsShowcase();

  return (
    <main className={styles.root}>
      <section className={styles.hero}>
        <header className={styles.head}>
          <span className={styles.eyebrow}>Поддержка сервера</span>
          <h1 className={styles.title}>{DONATIONS_SECTION_TITLE}</h1>
          <div className={styles.headRow}>
            <p className={styles.intro}>
              Товары за кредиты Империи. Кредиты начисляет
              командование — за поддержку сервера и заслуги в строю.
            </p>
            <BalanceChip balance={balance} pending={authPending} guest={guest} />
          </div>
        </header>
      </section>

      <div className={styles.content}>
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : error ? (
          <div className={styles.error}>
            <p className={styles.errorText}>Не удалось загрузить товары.</p>
            <Button size="large" onClick={() => void retry()}>
              Повторить
            </Button>
          </div>
        ) : empty ? (
          <p className={styles.empty}>Товаров пока нет.</p>
        ) : (
          <div className={styles.grid}>
            {items.map((item) => (
              <DonationCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
