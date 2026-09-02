import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import {
  pagesApi,
  CreatePageDto,
  CreatePageSectionDto,
  ReorderPagesDto,
  UpdatePageDto,
  UpdatePageSectionDto,
} from '@/shared/api/pages';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { PageSummary, PagesState } from '../types';
import { mapPageDto, mapPageSectionDto } from './mappers';

export interface PagesActions {
  fetchTree: () => Promise<void>;
  fetchPage: (slug: string) => Promise<void>;
  fetchSummaries: (slugs: string[]) => Promise<void>;
  savePageWrapper: (dto: UpdatePageDto) => Promise<boolean>;
  createSection: (dto: CreatePageSectionDto) => Promise<boolean>;
  updateSection: (id: number, dto: UpdatePageSectionDto) => Promise<boolean>;
  deleteSection: (id: number) => Promise<boolean>;
  reorderSections: (ids: number[]) => Promise<boolean>;
  createPage: (dto: CreatePageDto) => Promise<boolean>;
  updatePage: (id: number, dto: UpdatePageDto) => Promise<boolean>;
  deletePage: (id: number) => Promise<boolean>;
  reorderPages: (dto: ReorderPagesDto) => Promise<boolean>;
}

const MUTATION_ERRORS: Record<number, string> = {
  400: 'Структура изменилась — обновите страницу',
  403: 'Недостаточно прав',
  404: 'Не найдено — обновите страницу',
  409: 'Такой slug уже занят',
};

function showError(error: unknown) {
  alertHandler.addAlert({ defaultText: getApiErrorMessage(error, MUTATION_ERRORS) });
}

export const createPagesActions: StateCreator<
  PagesState & PagesActions,
  [],
  [],
  PagesActions
> = (set, get) => ({
  fetchTree: async () => {
    // Не сбрасываем ready — иначе меню и админка мигают при каждом обновлении
    if (get().treeStatus !== 'ready') set({ treeStatus: 'loading' });
    try {
      const { data } = await pagesApi.getTree();
      set({ tree: data, treeStatus: 'ready' });
    } catch {
      // Дерево грузится и в шапке на каждой странице — алертами не шумим,
      // админка показывает своё error-состояние с «Повторить»
      set({ treeStatus: 'error' });
    }
  },

  fetchPage: async (slug) => {
    set({ pageSlug: slug, pageStatus: 'loading', page: null });
    try {
      const { data } = await pagesApi.getPage(slug);
      // Пока запрос летел, могли запросить другую страницу — не затираем её состояние
      if (get().pageSlug !== slug) return;
      set({ page: mapPageDto(data), pageStatus: 'ready' });
    } catch (error) {
      if (get().pageSlug !== slug) return;
      // 404 — нет страницы или не видна по статусу; штатный случай, без алерта
      if (isAxiosError(error) && error.response?.status === 404) {
        set({ pageStatus: 'notFound' });
        return;
      }
      set({ pageStatus: 'error' });
      showError(error);
    }
  },

  fetchSummaries: async (slugs) => {
    const known = get().summaries;
    const missing = slugs.filter((slug) => !(slug in known));
    if (missing.length === 0) return;

    const loaded = await Promise.all(
      missing.map(async (slug): Promise<[string, PageSummary | null]> => {
        try {
          const { data } = await pagesApi.getPage(slug);
          return [slug, { eyebrow: data.hero_eyebrow, title: data.hero_title, intro: data.hero_intro }];
        } catch {
          // Карточка без описания на лендинге — не повод для алерта
          return [slug, null];
        }
      }),
    );

    set({ summaries: { ...get().summaries, ...Object.fromEntries(loaded) } });
  },

  savePageWrapper: async (dto) => {
    const page = get().page;
    if (!page) return false;
    set({ savingWrapper: true });
    try {
      const { data } = await pagesApi.updatePage(page.id, dto);
      set({ page: mapPageDto(data, page.sections) });
      alertHandler.addAlert({ status: 'success', defaultText: 'Страница обновлена' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingWrapper: false });
    }
  },

  createSection: async (dto) => {
    const page = get().page;
    if (!page) return false;
    set({ creatingSection: true });
    try {
      const { data } = await pagesApi.createSection(page.id, dto);
      set({ page: { ...page, sections: [...page.sections, mapPageSectionDto(data)] } });
      alertHandler.addAlert({ status: 'success', defaultText: 'Секция добавлена' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ creatingSection: false });
    }
  },

  updateSection: async (id, dto) => {
    set({ savingSectionId: id });
    try {
      const { data } = await pagesApi.updateSection(id, dto);
      const page = get().page;
      if (page) {
        set({
          page: {
            ...page,
            sections: page.sections.map((section) =>
              section.id === id ? mapPageSectionDto(data) : section,
            ),
          },
        });
      }
      alertHandler.addAlert({ status: 'success', defaultText: 'Секция сохранена' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingSectionId: null });
    }
  },

  deleteSection: async (id) => {
    set({ savingSectionId: id });
    try {
      await pagesApi.deleteSection(id);
      const page = get().page;
      if (page) {
        set({ page: { ...page, sections: page.sections.filter((section) => section.id !== id) } });
      }
      alertHandler.addAlert({ status: 'success', defaultText: 'Секция удалена' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingSectionId: null });
    }
  },

  reorderSections: async (ids) => {
    const page = get().page;
    if (!page) return false;
    set({ reordering: true });
    try {
      await pagesApi.reorderSections(page.id, ids);
      const byId = new Map(page.sections.map((section) => [section.id, section]));
      const sections = ids
        .map((id) => byId.get(id))
        .filter((section): section is NonNullable<typeof section> => Boolean(section));
      set({ page: { ...page, sections } });
      alertHandler.addAlert({ status: 'success', defaultText: 'Порядок обновлён' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ reordering: false });
    }
  },

  createPage: async (dto) => {
    set({ savingTree: true });
    try {
      await pagesApi.createPage(dto);
      alertHandler.addAlert({ status: 'success', defaultText: 'Страница создана' });
      await get().fetchTree();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingTree: false });
    }
  },

  updatePage: async (id, dto) => {
    set({ savingTree: true });
    try {
      await pagesApi.updatePage(id, dto);
      alertHandler.addAlert({ status: 'success', defaultText: 'Страница обновлена' });
      await get().fetchTree();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingTree: false });
    }
  },

  deletePage: async (id) => {
    set({ savingTree: true });
    try {
      await pagesApi.deletePage(id);
      alertHandler.addAlert({ status: 'success', defaultText: 'Страница удалена' });
      await get().fetchTree();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingTree: false });
    }
  },

  reorderPages: async (dto) => {
    set({ savingTree: true });
    try {
      await pagesApi.reorderPages(dto);
      alertHandler.addAlert({ status: 'success', defaultText: 'Порядок обновлён' });
      await get().fetchTree();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingTree: false });
    }
  },
});
