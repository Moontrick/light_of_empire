import type { CharterBlock, ForumPost } from '@/shared/types';

export interface CommentItemProps {
  post: ForumPost;
  canReply: boolean;
  canEdit: boolean;
  canDelete: boolean;
  editing: boolean;
  editDraft: CharterBlock[];
  mutating: boolean;
  onReply: () => void;
  onStartEdit: () => void;
  onEditChange: (blocks: CharterBlock[]) => void;
  onEditSubmit: () => void;
  onEditCancel: () => void;
  onDelete: () => void;
}
