import type { ForumThread } from '@/shared/types';
import type { ThreadPermissions } from '../../types';

export interface ModerationMenuProps {
  thread: ForumThread;
  permissions: ThreadPermissions;
}

export type ModerationModal = 'lock' | 'move' | 'tags' | 'delete' | null;
