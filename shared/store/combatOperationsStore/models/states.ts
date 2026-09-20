import type { CombatOperationsState } from '../types';

export const COMBAT_OPERATIONS_PAGE_LIMIT = 10;

export const InitState: CombatOperationsState = {
  posts: [],
  total: 0,
  page: 1,
  feedStatus: 'idle',
  article: null,
  articleStatus: 'idle',
};
