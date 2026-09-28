import { Link } from '@/shared/i18n/navigation';
import { formatDateTime } from '@/shared/utils/formatDateTime';
import { ForumAuthorCard } from '@ui/ForumAuthorCard';
import { ForumTagChip } from '@ui/ForumTagChip';
import { ThreadStatusBadge } from '@ui/ThreadStatusBadge';
import type { ThreadRowProps } from './types';
import styles from './ThreadRow.module.scss';

export function ThreadRow({ thread }: ThreadRowProps) {
  const activityAt = thread.last_post_at ?? thread.created_at;

  return (
    <article className={styles.row}>
      <div className={styles.main}>
        <div className={styles.titleLine}>
          <ThreadStatusBadge status={thread.status} pinned={thread.is_pinned} />
          <Link href={`/forum/threads/${thread.id}`} className={styles.title}>
            {thread.title}
          </Link>
        </div>
        {thread.tags.length > 0 && (
          <div className={styles.tags}>
            {thread.tags.map((tag) => (
              <ForumTagChip key={tag.id} tag={tag} />
            ))}
          </div>
        )}
        <ForumAuthorCard
          author={thread.author}
          size="sm"
          meta={<time dateTime={thread.created_at}>{formatDateTime(thread.created_at)}</time>}
        />
      </div>
      <div className={styles.stats}>
        <span className={styles.count}>{thread.posts_count}</span>
        <span className={styles.countLabel}>ответов</span>
      </div>
      <div className={styles.activity}>
        <time className={styles.activityDate} dateTime={activityAt}>
          {formatDateTime(activityAt)}
        </time>
        {thread.last_post_author && (
          <span className={styles.activityAuthor}>@{thread.last_post_author.login}</span>
        )}
      </div>
    </article>
  );
}
