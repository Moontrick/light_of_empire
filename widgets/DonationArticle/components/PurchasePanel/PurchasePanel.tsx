'use client';

import { Button, Skeleton } from 'antd';
import { Link } from '@/shared/i18n/navigation';
import { PurchaseModal } from '../PurchaseModal';
import { usePurchasePanel } from './hooks/usePurchasePanel';
import type { PurchasePanelProps } from './types';
import styles from './PurchasePanel.module.scss';

export function PurchasePanel({ donation, onUnavailable }: PurchasePanelProps) {
  const { pending, guest, steamMissing, shortage, modalOpen, openModal, closeModal } =
    usePurchasePanel(donation);

  if (pending) {
    return <Skeleton.Button active size="large" block />;
  }

  if (guest) {
    return (
      <Link href="/login" className={styles.primaryLink}>
        Войти, чтобы купить
      </Link>
    );
  }

  if (steamMissing) {
    return (
      <div className={styles.note}>
        <p className={styles.noteText}>Для покупки нужен привязанный Steam.</p>
        <Link href="/profile" className={styles.primaryLink}>
          Привязать в профиле
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.note}>
      <Button type="primary" size="large" block disabled={shortage > 0} onClick={openModal}>
        Купить
      </Button>
      {shortage > 0 && (
        <p className={styles.noteText}>Не хватает {shortage.toLocaleString('ru-RU')} кредитов</p>
      )}
      <PurchaseModal
        donation={donation}
        open={modalOpen}
        onClose={closeModal}
        onUnavailable={onUnavailable}
      />
    </div>
  );
}
