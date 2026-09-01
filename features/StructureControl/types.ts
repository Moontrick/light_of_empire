import type { PageTreeNodeDto } from '@/shared/api/pages';

export interface PageFormTarget {
  open: boolean;
  node: PageTreeNodeDto | null;
}
