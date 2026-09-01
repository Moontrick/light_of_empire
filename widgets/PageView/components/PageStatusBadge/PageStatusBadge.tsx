import { PAGE_STATUS_LABELS } from '@/shared/constants';
import type { PageStatusBadgeProps } from './types';
import styles from './PageStatusBadge.module.scss';

export function PageStatusBadge({ status }: PageStatusBadgeProps) {
  return <div className={styles.badge}>Статус страницы: {PAGE_STATUS_LABELS[status]}</div>;
}
