import classNames from 'classnames';
import { FORUM_DELETED_USER_LABEL } from '@/shared/constants';
import { DirectoryTag } from '@ui/DirectoryTag';
import { RoleBadge } from '@ui/RoleBadge';
import { UserAvatar } from '@ui/UserAvatar';
import type { ForumAuthorCardProps } from './types';
import styles from './ForumAuthorCard.module.scss';

export function ForumAuthorCard({ author, size = 'md', meta }: ForumAuthorCardProps) {
  const showTags = size === 'md' && Boolean(author?.formation || author?.position);

  return (
    <div className={classNames(styles.root, { [styles.sm]: size === 'sm' })}>
      <UserAvatar size="sm" src={author?.avatar_url} alt={author?.login ?? FORUM_DELETED_USER_LABEL} />
      <div className={styles.body}>
        <div className={styles.line}>
          <span className={classNames(styles.login, { [styles.deleted]: !author })}>
            {author?.login ?? FORUM_DELETED_USER_LABEL}
          </span>
          {author && <RoleBadge role={author.role} />}
        </div>
        {showTags && author && (
          <div className={styles.tags}>
            {author.formation && <DirectoryTag entry={author.formation} />}
            {author.position && <DirectoryTag entry={author.position} />}
          </div>
        )}
        {meta && <div className={styles.meta}>{meta}</div>}
      </div>
    </div>
  );
}
