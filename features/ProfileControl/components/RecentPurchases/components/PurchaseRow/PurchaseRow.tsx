import classNames from 'classnames';
import { Link } from '@/shared/i18n/navigation';
import { CreditsAmount } from '@ui/CreditsAmount';
import { PurchaseStatusTag } from '@ui/PurchaseStatusTag';
import { formatDateTime } from '@/shared/utils/formatDateTime';
import type { PurchaseRowProps } from './types';
import styles from './PurchaseRow.module.scss';

export function PurchaseRow({ purchase }: PurchaseRowProps) {
  const { donation, status } = purchase;
  const donationHref = `/donations/${donation.id}`;

  return (
    <li className={classNames(styles.row, styles[status])}>
      <Link href={donationHref} className={styles.media}>
        {donation.coverUrl ? (
          <img src={donation.coverUrl} alt={donation.title} className={styles.cover} />
        ) : (
          <span className={styles.coverFallback} aria-hidden />
        )}
      </Link>

      <div className={styles.meta}>
        <Link href={donationHref} className={styles.title}>
          {donation.title}
        </Link>
        <time className={styles.date} dateTime={purchase.createdAt}>
          Заявка №{purchase.id} · {formatDateTime(purchase.createdAt)}
        </time>
      </div>

      <div className={styles.aside}>
        <CreditsAmount value={purchase.price} />
        <PurchaseStatusTag status={status} />
      </div>
    </li>
  );
}
