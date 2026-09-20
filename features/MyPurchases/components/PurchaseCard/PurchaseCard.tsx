import classNames from 'classnames';
import { format } from 'date-fns';
import { Link } from '@/shared/i18n/navigation';
import { PurchaseStatus } from '@/shared/types';
import { CreditsAmount } from '@ui/CreditsAmount';
import { HudCorners } from '@ui/HudCorners';
import { PurchaseStatusTag } from '@ui/PurchaseStatusTag';
import type { PurchaseCardProps } from './types';
import styles from './PurchaseCard.module.scss';

const formatDateTime = (value: string) => format(new Date(value), 'dd.MM.yyyy HH:mm');

// Подпись к ответу куратора зависит от исхода; в обработке ответа ещё нет
const RESOLUTION_LABELS: Partial<Record<PurchaseStatus, string>> = {
  [PurchaseStatus.ISSUED]: 'Ответ куратора',
  [PurchaseStatus.REJECTED]: 'Причина отказа',
};

export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const { donation, status } = purchase;
  const resolutionLabel = RESOLUTION_LABELS[status];

  return (
    <article className={classNames(styles.card, styles[status])}>
      <HudCorners />

      <Link href={`/donations/${donation.id}`} className={styles.media}>
        {donation.coverUrl ? (
          <img src={donation.coverUrl} alt={donation.title} className={styles.cover} />
        ) : (
          <span className={styles.coverFallback} aria-hidden />
        )}
      </Link>

      <div className={styles.body}>
        <div className={styles.head}>
          <Link href={`/donations/${donation.id}`} className={styles.title}>
            {donation.title}
          </Link>
          <PurchaseStatusTag status={status} />
        </div>

        <div className={styles.meta}>
          <CreditsAmount value={purchase.price} />
          <span className={styles.metaDivider} aria-hidden />
          <span className={styles.metaText}>Заявка №{purchase.id}</span>
          <span className={styles.metaDivider} aria-hidden />
          <time className={styles.metaText} dateTime={purchase.createdAt}>
            {formatDateTime(purchase.createdAt)}
          </time>
        </div>

        {purchase.userComment && (
          <p className={styles.note}>
            <span className={styles.noteLabel}>Комментарий</span>
            {purchase.userComment}
          </p>
        )}

        {resolutionLabel && (
          <p className={classNames(styles.note, styles.resolution)}>
            <span className={styles.noteLabel}>
              {resolutionLabel}
              {purchase.processedAt && (
                <time dateTime={purchase.processedAt}> · {formatDateTime(purchase.processedAt)}</time>
              )}
            </span>
            {purchase.resolutionComment ?? 'Без комментария'}
          </p>
        )}

        {status === PurchaseStatus.PENDING && (
          <p className={classNames(styles.note, styles.pendingHint)}>
            Куратор свяжется с вами по Steam и выдаст товар
          </p>
        )}
      </div>
    </article>
  );
}
