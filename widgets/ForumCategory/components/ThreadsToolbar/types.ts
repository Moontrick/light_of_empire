import type { ForumTag, ForumThreadSort } from '@/shared/types';

export interface ThreadsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  tags: ForumTag[];
  tag?: number;
  onTagChange: (tag?: number) => void;
  sort: ForumThreadSort;
  onSortChange: (sort: ForumThreadSort) => void;
}
