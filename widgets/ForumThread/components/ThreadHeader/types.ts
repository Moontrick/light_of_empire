import type { ReactNode } from 'react';
import type { ForumThread } from '@/shared/types';

export interface ThreadHeaderProps {
  thread: ForumThread;
  // Меню модерации (Task 9); до него — null
  actions?: ReactNode;
}
