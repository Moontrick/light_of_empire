import { create } from 'zustand';
import type { NewsState } from './types';
import { NewsActions, createNewsActions } from './models/actions';
import { InitState, NEWS_PAGE_LIMIT } from './models/states';

export const useNewsStore = create<NewsState & NewsActions>()((set, get, store) => ({
  ...InitState,
  ...createNewsActions(set, get, store),
}));

export { NEWS_PAGE_LIMIT };
export { mapNewsListItemDto, mapNewsDetailDto } from './models/mappers';
export type { NewsArticleStatus, NewsFeedStatus, NewsState } from './types';
