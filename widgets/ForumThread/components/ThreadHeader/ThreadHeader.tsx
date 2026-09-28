import { Link } from '@/shared/i18n/navigation';
import { formatDateTime } from '@/shared/utils/formatDateTime';
import { ForumAuthorCard } from '@ui/ForumAuthorCard';
import { ForumTagChip } from '@ui/ForumTagChip';
import { ThreadStatusBadge } from '@ui/ThreadStatusBadge';
import type { ThreadHeaderProps } from './types';
import styles from './ThreadHeader.module.scss';

export function ThreadHeader({ thread, actions }: ThreadHeaderProps) {
  return (
    <header className={styles.root}>
      <div className={styles.crumbs}>
        <Link href="/forum" className={styles.crumb}>Форум</Link>
        <span className={styles.crumbSep} aria-hidden>/</span>
        <Link href={`/forum/${thread.category.slug}`} className={styles.crumb}>
          {thread.category.name}
        </Link>
      </div>

      <div className={styles.titleLine}>
        <ThreadStatusBadge status={thread.status} pinned={thread.is_pinned} />
        <h1 className={styles.title}>{thread.title}</h1>
      </div>

      {thread.tags.length > 0 && (
        <div className={styles.tags}>
          {thread.tags.map((tag) => (
            <ForumTagChip key={tag.id} tag={tag} />
          ))}
        </div>
      )}

      <div className={styles.metaLine}>
        <ForumAuthorCard
          author={thread.author}
          meta={
            <>
              <time dateTime={thread.created_at}>{formatDateTime(thread.created_at)}</time>
              {thread.edited_at && <span> · изменено {formatDateTime(thread.edited_at)}</span>}
            </>
          }
        />
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </header>
  );
}
