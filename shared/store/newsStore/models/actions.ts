import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import { newsApi } from '@/shared/api/news';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { NewsState } from '../types';
import { mapNewsDetailDto, mapNewsListItemDto } from './mappers';
import { NEWS_PAGE_LIMIT } from './states';

export interface NewsActions {
  fetchFeed: () => Promise<void>;
  loadMore: () => Promise<void>;
  fetchArticle: (slug: string) => Promise<void>;
}

export const createNewsActions: StateCreator<
  NewsState & NewsActions,
  [],
  [],
  NewsActions
> = (set, get) => ({
  fetchFeed: async () => {
    set({ feedStatus: 'loading' });
    try {
      const { data } = await newsApi.getNewsList({ page: 1, limit: NEWS_PAGE_LIMIT });
      set({
        posts: data.items.map(mapNewsListItemDto),
        total: data.total,
        page: data.page,
        feedStatus: 'ready',
      });
    } catch (error) {
      set({ feedStatus: 'error' });
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    }
  },

  loadMore: async () => {
    if (get().feedStatus !== 'ready') return;
    const { page, posts } = get();
    set({ feedStatus: 'loadingMore' });
    try {
      const { data } = await newsApi.getNewsList({ page: page + 1, limit: NEWS_PAGE_LIMIT });
      set({
        posts: [...posts, ...data.items.map(mapNewsListItemDto)],
        total: data.total,
        page: data.page,
        feedStatus: 'ready',
      });
    } catch (error) {
      set({ feedStatus: 'ready' });
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    }
  },

  fetchArticle: async (slug) => {
    set({ article: null, articleStatus: 'loading' });
    try {
      const { data } = await newsApi.getNewsBySlug(slug);
      set({ article: mapNewsDetailDto(data), articleStatus: 'ready' });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        set({ articleStatus: 'notFound' });
        return;
      }
      set({ articleStatus: 'error' });
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    }
  },
});
