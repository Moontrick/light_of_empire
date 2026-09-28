import type { ForumTag } from '@/shared/types';

export interface ForumTagChipProps {
  tag: Pick<ForumTag, 'name' | 'color'>;
}
