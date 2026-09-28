'use client';

import { useAuthStore } from '@store/authStore';
import { ForumThreadStatus, hasRoleAtLeast, UserRole } from '@/shared/types';
import type { ForumThread } from '@/shared/types';
import { isForumAuthor } from '@/shared/utils/isForumAuthor';
import type { ThreadPermissions } from '../types';

const NONE: ThreadPermissions = {
  isAdmin: false, isAuthor: false, canEdit: false, canClose: false, canReopen: false,
  canLock: false, canUnlock: false, canDelete: false, canRestore: false,
  canModerate: false, canComment: false,
};

// Зеркало таблицы переходов из docs/forum-api.md; окончательно решает бэк
export function useThreadPermissions(thread: ForumThread | null): ThreadPermissions {
  const user = useAuthStore((state) => state.user);
  if (!thread || !user) return NONE;

  const isAdmin = hasRoleAtLeast(user.role, UserRole.ADMIN);
  const isAuthor = isForumAuthor(thread.author, user);
  const { status } = thread;
  const isOpen = status === ForumThreadStatus.OPEN;
  const isClosed = status === ForumThreadStatus.CLOSED;
  const isLocked = status === ForumThreadStatus.LOCKED;
  const isDeleted = status === ForumThreadStatus.DELETED;
  const authorOrAdmin = isAuthor || isAdmin;

  return {
    isAdmin,
    isAuthor,
    canEdit: !isDeleted && (isAdmin || (isAuthor && isOpen)),
    canClose: isOpen && authorOrAdmin,
    canReopen: isClosed && authorOrAdmin,
    canLock: (isOpen || isClosed) && isAdmin,
    canUnlock: isLocked && isAdmin,
    canDelete: ((isOpen || isClosed) && authorOrAdmin) || (isLocked && isAdmin),
    canRestore: isDeleted && isAdmin,
    canModerate: isAdmin,
    canComment: isOpen,
  };
}
