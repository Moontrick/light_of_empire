import type { ForumThreadStatus } from '@/shared/types';

export interface ThreadStatusBadgeProps {
  status: ForumThreadStatus;
  pinned?: boolean;
}
