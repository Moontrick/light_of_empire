import { FORUM_DELETED_USER_LABEL } from '@/shared/constants';
import type { ReplyQuoteProps } from './types';
import styles from './ReplyQuote.module.scss';

export function ReplyQuote({ replyTo }: ReplyQuoteProps) {
  return (
    <a href={`#post-${replyTo.id}`} className={styles.root}>
      <span className={styles.author}>
        {replyTo.author ? `@${replyTo.author.login}` : FORUM_DELETED_USER_LABEL}
      </span>
      <span className={styles.excerpt}>{replyTo.excerpt ?? 'Комментарий удалён'}</span>
    </a>
  );
}
