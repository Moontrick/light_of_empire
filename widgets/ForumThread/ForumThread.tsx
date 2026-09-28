'use client';

import { Button, ConfigProvider, Skeleton } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { Link } from '@/shared/i18n/navigation';
import { FORUM_POST_IMAGES_MAX } from '@/shared/constants';
import { CommentComposer } from '@ui/CommentComposer';
import { CommentList } from './components/CommentList';
import { ModerationMenu } from './components/ModerationMenu';
import { StatusNotice } from './components/StatusNotice';
import { ThreadBody } from './components/ThreadBody';
import { ThreadHeader } from './components/ThreadHeader';
import { useForumThread } from './hooks/useForumThread';
import type { ForumThreadProps } from './types';
import styles from './ForumThread.module.scss';

export function ForumThread({ id }: ForumThreadProps) {
  const {
    thread, posts, permissions, loading, notFound, error, retry,
    hasMorePosts, loadingMorePosts, loadMorePosts, mutating,
    showGuestHint, canComment, draft, setDraft, replyChip, submitComment,
    editingId, editDraft, setEditDraft, startEdit, cancelEdit, submitEdit,
    canEditPost, canDeletePost, canReply, reply, deletePost,
  } = useForumThread(id);

  if (loading) {
    return (
      <main className={styles.root}>
        <div className={styles.content}>
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.root}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Не удалось загрузить тему</h1>
          <div className={styles.notFoundActions}>
            <Button size="large" onClick={() => void retry()}>Повторить</Button>
            <Link href="/forum" className={styles.back}>К форуму</Link>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !thread) {
    return (
      <main className={styles.root}>
        <div className={styles.notFound}>
          <h1 className={styles.notFoundTitle}>Тема не найдена</h1>
          <p className={styles.notFoundText}>Возможно, её удалили или ссылка устарела.</p>
          <Link href="/forum" className={styles.back}>К форуму</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.root}>
      <ConfigProvider theme={FORM_THEME}>
        <div className={styles.content}>
          <ThreadHeader thread={thread} actions={<ModerationMenu thread={thread} permissions={permissions} />} />
          <ThreadBody blocks={thread.blocks} />
          <StatusNotice thread={thread} />

          <CommentList
            posts={posts}
            total={thread.posts_count}
            hasMore={hasMorePosts}
            loadingMore={loadingMorePosts}
            mutating={mutating}
            editingId={editingId}
            editDraft={editDraft}
            canReply={canReply}
            canEditPost={canEditPost}
            canDeletePost={canDeletePost}
            onLoadMore={() => void loadMorePosts()}
            onReply={reply}
            onStartEdit={startEdit}
            onEditChange={setEditDraft}
            onEditSubmit={() => void submitEdit()}
            onEditCancel={cancelEdit}
            onDelete={(post) => void deletePost(post.id)}
          />

          {canComment && (
            <section id="comment-composer" className={styles.composer}>
              <h2 className={styles.composerTitle}>Ваш комментарий</h2>
              <CommentComposer
                value={draft}
                onChange={setDraft}
                onSubmit={() => void submitComment()}
                submitting={mutating}
                maxImages={FORUM_POST_IMAGES_MAX}
                replyTo={replyChip}
              />
            </section>
          )}

          {showGuestHint && (
            <p className={styles.guestHint}>
              <Link href="/login">Войдите</Link>, чтобы оставить комментарий.
            </p>
          )}
        </div>
      </ConfigProvider>
    </main>
  );
}
