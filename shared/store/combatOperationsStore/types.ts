import type { CombatOperation, CombatOperationDetail } from '@/shared/types';

export type CombatOperationsFeedStatus = 'idle' | 'loading' | 'loadingMore' | 'ready' | 'error';
export type CombatOperationArticleStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface CombatOperationsState {
  posts: CombatOperation[];
  total: number;
  page: number;
  feedStatus: CombatOperationsFeedStatus;
  article: CombatOperationDetail | null;
  articleStatus: CombatOperationArticleStatus;
}
