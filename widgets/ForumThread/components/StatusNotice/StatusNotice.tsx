import { THREAD_STATUS_LABELS } from '@/shared/constants';
import { ForumThreadStatus } from '@/shared/types';
import { formatDateTime } from '@/shared/utils/formatDateTime';
import type { StatusNoticeProps } from './types';
import styles from './StatusNotice.module.scss';

const HINTS: Record<ForumThreadStatus, string> = {
  [ForumThreadStatus.OPEN]: '',
  [ForumThreadStatus.CLOSED]: 'Новые комментарии в закрытую тему не принимаются.',
  [ForumThreadStatus.LOCKED]: 'Тема заблокирована модерацией, комментарии и правки недоступны.',
  [ForumThreadStatus.DELETED]: 'Тема удалена и видна только администрации.',
};

export function StatusNotice({ thread }: StatusNoticeProps) {
  if (thread.status === ForumThreadStatus.OPEN) return null;

  return (
    <aside className={styles.root}>
      <span className={styles.label}>{THREAD_STATUS_LABELS[thread.status]}</span>
      <p className={styles.hint}>{HINTS[thread.status]}</p>
      {thread.status_reason && <p className={styles.reason}>Причина: {thread.status_reason}</p>}
      {thread.status_changed_at && (
        <p className={styles.meta}>
          {thread.status_changed_by ? `@${thread.status_changed_by.login}` : 'Система'}
          {' · '}
          {formatDateTime(thread.status_changed_at)}
        </p>
      )}
    </aside>
  );
}
