import type { ForumTag } from '@/shared/types';

export interface ThreadTagsModalProps {
  open: boolean;
  loading: boolean;
  tags: ForumTag[];
  initial: number[];
  onSubmit: (tagIds: number[]) => void;
  onCancel: () => void;
}
