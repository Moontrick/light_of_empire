import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import type { CreateNewsDto, UpdateNewsDto } from '@/shared/api/news';
import { newsApi } from '@/shared/api/news';
import { NewsStatus } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import { mapNewsDetailDto, mapNewsListItemDto } from '@/shared/store/newsStore';
import type { NewsAdminState } from '../types';

export interface NewsAdminActions {
  fetchList: (page?: number) => Promise<void>;
  setStatusFilter: (status: NewsStatus | null) => void;
  fetchEditable: (slug: string) => Promise<void>;
  resetEditable: () => void;
  createNews: (dto: CreateNewsDto) => Promise<boolean>;
  updateNews: (id: number, dto: UpdateNewsDto) => Promise<boolean>;
  publishNews: (id: number) => Promise<boolean>;
  archiveNews: (id: number) => Promise<boolean>;
}

const MUTATION_ERRORS: Record<number, string> = {
  403: 'Недостаточно прав',
  404: 'Новость не найдена — обновите страницу',
  409: 'Такой slug уже занят',
};

function showError(error: unknown) {
  alertHandler.addAlert({ defaultText: getApiErrorMessage(error, MUTATION_ERRORS) });
}

export const createNewsAdminActions: StateCreator<
  NewsAdminState & NewsAdminActions,
  [],
  [],
  NewsAdminActions
> = (set, get) => ({
  fetchList: async (page) => {
    const { limit, statusFilter } = get();
    const targetPage = page ?? get().page;
    set({ listStatus: 'loading' });
    try {
      const { data } = await newsApi.getNewsList({
        page: targetPage,
        limit,
        status: statusFilter ?? undefined,
      });
      set({
        items: data.items.map(mapNewsListItemDto),
        total: data.total,
        page: data.page,
        listStatus: 'ready',
      });
    } catch (error) {
      set({ listStatus: 'error' });
      showError(error);
    }
  },

  setStatusFilter: (status) => {
    set({ statusFilter: status, page: 1 });
    void get().fetchList(1);
  },

  fetchEditable: async (slug) => {
    set({ editable: null, editableStatus: 'loading' });
    try {
      const { data } = await newsApi.getNewsBySlug(slug);
      set({ editable: mapNewsDetailDto(data), editableStatus: 'ready' });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        set({ editableStatus: 'notFound' });
        return;
      }
      set({ editableStatus: 'error' });
      showError(error);
    }
  },

  resetEditable: () => set({ editable: null, editableStatus: 'idle' }),

  createNews: async (dto) => {
    set({ saving: true });
    try {
      await newsApi.createNews(dto);
      alertHandler.addAlert({ status: 'success', defaultText: 'Новость создана' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  updateNews: async (id, dto) => {
    set({ saving: true });
    try {
      await newsApi.updateNews(id, dto);
      alertHandler.addAlert({ status: 'success', defaultText: 'Новость сохранена' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  publishNews: async (id) => {
    set({ mutatingId: id });
    try {
      await newsApi.updateNews(id, { status: NewsStatus.PUBLISHED });
      alertHandler.addAlert({ status: 'success', defaultText: 'Новость опубликована' });
      await get().fetchList();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ mutatingId: null });
    }
  },

  archiveNews: async (id) => {
    set({ mutatingId: id });
    try {
      await newsApi.archiveNews(id);
      alertHandler.addAlert({ status: 'success', defaultText: 'Новость перенесена в архив' });
      await get().fetchList();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ mutatingId: null });
    }
  },
});
