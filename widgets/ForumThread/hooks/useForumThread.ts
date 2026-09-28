'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { useForumStore } from '@store/forumStore';
import { FORUM_DELETED_USER_LABEL } from '@/shared/constants';
import { ForumPostStatus, ForumThreadStatus } from '@/shared/types';
import type { CharterBlock, ForumPost } from '@/shared/types';
import { isForumAuthor } from '@/shared/utils/isForumAuthor';
import { useThreadPermissions } from './useThreadPermissions';

export function useForumThread(id: number) {
  const {
    thread, threadStatus, posts, postsTotal, postsStatus, mutating,
    fetchThread, loadMorePosts, resetThread, createPost, updatePost, deletePost,
  } = useForumStore();
  const currentThread = thread?.id === id ? thread : null;
  const user = useAuthStore((state) => state.user);
  const authStatus = useAuthStore((state) => state.status);
  const permissions = useThreadPermissions(currentThread);

  const [draft, setDraft] = useState<CharterBlock[]>([]);
  const [replyTo, setReplyTo] = useState<ForumPost | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState<CharterBlock[]>([]);

  useEffect(() => {
    void fetchThread(id);
    return () => resetThread();
  }, [id, fetchThread, resetThread]);

  const submitComment = async () => {
    const ok = await createPost({ blocks: draft, ...(replyTo ? { reply_to_id: replyTo.id } : {}) });
    if (ok) {
      setDraft([]);
      setReplyTo(null);
    }
  };

  const startEdit = (post: ForumPost) => {
    setEditingId(post.id);
    setEditDraft(post.blocks);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft([]);
  };

  const submitEdit = async () => {
    if (editingId === null) return;
    const ok = await updatePost(editingId, { blocks: editDraft });
    if (ok) cancelEdit();
  };

  const threadOpen = currentThread?.status === ForumThreadStatus.OPEN;
  const threadDeleted = currentThread?.status === ForumThreadStatus.DELETED;

  const canEditPost = (post: ForumPost) =>
    post.status === ForumPostStatus.ACTIVE &&
    !threadDeleted &&
    (permissions.isAdmin || (isForumAuthor(post.author, user) && threadOpen));

  const canDeletePost = (post: ForumPost) =>
    post.status === ForumPostStatus.ACTIVE && (permissions.isAdmin || isForumAuthor(post.author, user));

  // После перечитывания темы (409 и т.п.) правка могла стать недоступной
  useEffect(() => {
    if (editingId === null) return;
    const post = posts.find((item) => item.id === editingId);
    if (!post || !canEditPost(post)) cancelEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, currentThread?.status]);

  const reply = (post: ForumPost) => {
    setReplyTo(post);
    document.getElementById('comment-composer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return {
    thread: currentThread,
    posts,
    permissions,
    loading: threadStatus === 'idle' || (threadStatus === 'loading' && !currentThread),
    notFound: threadStatus === 'notFound',
    error: threadStatus === 'error',
    retry: () => fetchThread(id),
    hasMorePosts: posts.length < postsTotal,
    loadingMorePosts: postsStatus === 'loadingMore',
    loadMorePosts,
    mutating,
    showGuestHint: authStatus === 'guest' && threadOpen,
    canComment: permissions.canComment && Boolean(user),
    draft, setDraft, submitComment,
    replyChip: replyTo
      ? { login: replyTo.author?.login ?? FORUM_DELETED_USER_LABEL, onClear: () => setReplyTo(null) }
      : null,
    editingId, editDraft, setEditDraft, startEdit, cancelEdit, submitEdit,
    canEditPost, canDeletePost,
    canReply: threadOpen && Boolean(user),
    reply,
    deletePost,
  };
}
