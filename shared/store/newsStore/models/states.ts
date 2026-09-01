import type { NewsState } from '../types';

export const NEWS_PAGE_LIMIT = 10;

export const InitState: NewsState = {
  posts: [],
  total: 0,
  page: 1,
  feedStatus: 'idle',
  article: null,
  articleStatus: 'idle',
};
