import type { CharterBlock, ForumPost } from '@/shared/types';

export interface CommentListProps {
  posts: ForumPost[];
  total: number;
  hasMore: boolean;
  loadingMore: boolean;
  mutating: boolean;
  editingId: number | null;
  editDraft: CharterBlock[];
  canReply: boolean;
  canEditPost: (post: ForumPost) => boolean;
  canDeletePost: (post: ForumPost) => boolean;
  onLoadMore: () => void;
  onReply: (post: ForumPost) => void;
  onStartEdit: (post: ForumPost) => void;
  onEditChange: (blocks: CharterBlock[]) => void;
  onEditSubmit: () => void;
  onEditCancel: () => void;
  onDelete: (post: ForumPost) => void;
}
