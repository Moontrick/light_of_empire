import { Button } from 'antd';
import { CommentItem } from '../CommentItem';
import type { CommentListProps } from './types';
import styles from './CommentList.module.scss';

export function CommentList({
  posts, total, hasMore, loadingMore, mutating, editingId, editDraft,
  canReply, canEditPost, canDeletePost,
  onLoadMore, onReply, onStartEdit, onEditChange, onEditSubmit, onEditCancel, onDelete,
}: CommentListProps) {
  return (
    <section className={styles.root}>
      <h2 className={styles.title}>Комментарии <span className={styles.count}>{total}</span></h2>
      {posts.length === 0 ? (
        <p className={styles.empty}>Комментариев пока нет.</p>
      ) : (
        posts.map((post) => (
          <CommentItem
            key={post.id}
            post={post}
            canReply={canReply}
            canEdit={canEditPost(post)}
            canDelete={canDeletePost(post)}
            editing={editingId === post.id}
            editDraft={editDraft}
            mutating={mutating}
            onReply={() => onReply(post)}
            onStartEdit={() => onStartEdit(post)}
            onEditChange={onEditChange}
            onEditSubmit={onEditSubmit}
            onEditCancel={onEditCancel}
            onDelete={() => onDelete(post)}
          />
        ))
      )}
      {hasMore && (
        <div className={styles.moreWrap}>
          <Button size="large" loading={loadingMore} onClick={onLoadMore}>
            Показать ещё
          </Button>
        </div>
      )}
    </section>
  );
}
