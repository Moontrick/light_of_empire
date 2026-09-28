import type { ForumTag } from '@/shared/types';

export interface TagCardProps {
  tag: ForumTag;
  disabled: boolean;
  onEdit: () => void;
  onDelete: () => void;
}
