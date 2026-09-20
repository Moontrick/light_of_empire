import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import { combatOperationsApi } from '@/shared/api/combatOperations';
import { NewsStatus } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { CombatOperationsState } from '../types';
import { mapCombatOperationDetailDto, mapCombatOperationListItemDto } from './mappers';
import { COMBAT_OPERATIONS_PAGE_LIMIT } from './states';

export interface CombatOperationsActions {
  fetchFeed: () => Promise<void>;
  loadMore: () => Promise<void>;
  fetchArticle: (slug: string) => Promise<void>;
}

export const createCombatOperationsActions: StateCreator<
  CombatOperationsState & CombatOperationsActions,
  [],
  [],
  CombatOperationsActions
> = (set, get) => ({
  fetchFeed: async () => {
    set({ feedStatus: 'loading' });
    try {
      const { data } = await combatOperationsApi.getList({
        page: 1,
        limit: COMBAT_OPERATIONS_PAGE_LIMIT,
        status: NewsStatus.PUBLISHED,
      });
      set({
        posts: data.items.map(mapCombatOperationListItemDto),
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
      const { data } = await combatOperationsApi.getList({
        page: page + 1,
        limit: COMBAT_OPERATIONS_PAGE_LIMIT,
        status: NewsStatus.PUBLISHED,
      });
      set({
        posts: [...posts, ...data.items.map(mapCombatOperationListItemDto)],
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
      const { data } = await combatOperationsApi.getBySlug(slug);
      set({ article: mapCombatOperationDetailDto(data), articleStatus: 'ready' });
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
