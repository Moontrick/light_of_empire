import classNames from 'classnames';
import { THREAD_STATUS_LABELS } from '@/shared/constants';
import { ForumThreadStatus } from '@/shared/types';
import type { ThreadStatusBadgeProps } from './types';
import styles from './ThreadStatusBadge.module.scss';

export function ThreadStatusBadge({ status, pinned = false }: ThreadStatusBadgeProps) {
  if (!pinned && status === ForumThreadStatus.OPEN) return null;

  return (
    <span className={styles.root}>
      {pinned && <span className={classNames(styles.badge, styles.pinned)}>Закреплена</span>}
      {status !== ForumThreadStatus.OPEN && (
        <span className={classNames(styles.badge, styles[status])}>{THREAD_STATUS_LABELS[status]}</span>
      )}
    </span>
  );
}
