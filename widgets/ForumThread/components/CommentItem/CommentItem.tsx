import { Button, Popconfirm } from 'antd';
import { FORUM_POST_IMAGES_MAX } from '@/shared/constants';
import { ForumPostStatus } from '@/shared/types';
import { formatDateTime } from '@/shared/utils/formatDateTime';
import { CommentComposer } from '@ui/CommentComposer';
import { DocBlock } from '@ui/DocBlock';
import { ForumAuthorCard } from '@ui/ForumAuthorCard';
import { ReplyQuote } from '../ReplyQuote';
import type { CommentItemProps } from './types';
import styles from './CommentItem.module.scss';

export function CommentItem({
  post, canReply, canEdit, canDelete, editing, editDraft, mutating,
  onReply, onStartEdit, onEditChange, onEditSubmit, onEditCancel, onDelete,
}: CommentItemProps) {
  const deleted = post.status === ForumPostStatus.DELETED;

  return (
    <article id={`post-${post.id}`} className={styles.root}>
      <ForumAuthorCard
        author={post.author}
        meta={
          <>
            <time dateTime={post.created_at}>{formatDateTime(post.created_at)}</time>
            {post.edited_at && <span> · изменено {formatDateTime(post.edited_at)}</span>}
            {deleted && post.deleted_at && (
              <span>
                {' · удалено '}
                {post.deleted_by ? `@${post.deleted_by.login}` : ''} {formatDateTime(post.deleted_at)}
              </span>
            )}
          </>
        }
      />

      <div className={styles.body}>
        {post.reply_to && <ReplyQuote replyTo={post.reply_to} />}
        {deleted ? (
          <p className={styles.deleted}>Комментарий удалён</p>
        ) : editing ? (
          <CommentComposer
            value={editDraft}
            onChange={onEditChange}
            onSubmit={onEditSubmit}
            onCancel={onEditCancel}
            submitting={mutating}
            submitLabel="Сохранить"
            maxImages={FORUM_POST_IMAGES_MAX}
          />
        ) : (
          post.blocks.map((block, index) => <DocBlock key={index} block={block} />)
        )}
      </div>

      {!deleted && !editing && (canReply || canEdit || canDelete) && (
        <div className={styles.actions}>
          {canReply && <Button size="small" type="text" onClick={onReply}>Ответить</Button>}
          {canEdit && <Button size="small" type="text" onClick={onStartEdit}>Править</Button>}
          {canDelete && (
            <Popconfirm
              title="Удалить комментарий?"
              description="Восстановить его будет нельзя"
              okText="Удалить"
              cancelText="Отмена"
              okButtonProps={{ danger: true, loading: mutating }}
              onConfirm={onDelete}
            >
              <Button size="small" type="text" danger disabled={mutating}>Удалить</Button>
            </Popconfirm>
          )}
        </div>
      )}
    </article>
  );
}
