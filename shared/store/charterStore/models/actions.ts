import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import {
  charterApi,
  CreateSectionDto,
  UpdateCharterDto,
  UpdateSectionDto,
} from '@/shared/api/charter';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { CharterState } from '../types';
import { mapCharterDto, mapSectionDto, mapWrapperDto } from './mappers';

export interface CharterActions {
  fetchCharter: () => Promise<void>;
  saveWrapper: (dto: UpdateCharterDto) => Promise<boolean>;
  createSection: (dto: CreateSectionDto) => Promise<boolean>;
  updateSection: (id: number, dto: UpdateSectionDto) => Promise<boolean>;
  deleteSection: (id: number) => Promise<boolean>;
  reorderSections: (ids: number[]) => Promise<boolean>;
}

const MUTATION_ERRORS: Record<number, string> = {
  403: 'Недостаточно прав',
  404: 'Секция не найдена — обновите страницу',
  409: 'Такой якорь (slug) уже занят',
};

function showError(error: unknown) {
  alertHandler.addAlert({ defaultText: getApiErrorMessage(error, MUTATION_ERRORS) });
}

export const createCharterActions: StateCreator<
  CharterState & CharterActions,
  [],
  [],
  CharterActions
> = (set, get) => ({
  fetchCharter: async () => {
    set({ status: 'loading' });
    try {
      const { data } = await charterApi.getCharter();
      set({ charter: mapCharterDto(data), status: 'ready' });
    } catch (error) {
      // 404 — устав ещё не создан, это штатное пустое состояние
      if (isAxiosError(error) && error.response?.status === 404) {
        set({ charter: null, status: 'empty' });
        return;
      }
      set({ status: 'error' });
      showError(error);
    }
  },

  saveWrapper: async (dto) => {
    const isFirstSave = get().status === 'empty';
    set({ savingWrapper: true });
    try {
      const { data } = await charterApi.updateCharter(dto);
      const sections = get().charter?.sections ?? [];
      set({ charter: mapWrapperDto(data, sections), status: 'ready' });
      alertHandler.addAlert({
        status: 'success',
        defaultText: isFirstSave ? 'Устав создан' : 'Устав обновлён',
      });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ savingWrapper: false });
    }
  },

  createSection: async (dto) => {
    set({ creatingSection: true });
    try {
      const { data } = await charterApi.createSection(dto);
      const charter = get().charter;
      if (charter) {
        set({ charter: { ...charter, sections: [...charter.sections, mapSectionDto(data)] } });
      }
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
      const { data } = await charterApi.updateSection(id, dto);
      const charter = get().charter;
      if (charter) {
        set({
          charter: {
            ...charter,
            sections: charter.sections.map((section) =>
              section.id === id ? mapSectionDto(data) : section,
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
      await charterApi.deleteSection(id);
      const charter = get().charter;
      if (charter) {
        set({
          charter: {
            ...charter,
            sections: charter.sections.filter((section) => section.id !== id),
          },
        });
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
    set({ reordering: true });
    try {
      await charterApi.reorderSections(ids);
      const charter = get().charter;
      if (charter) {
        const byId = new Map(charter.sections.map((section) => [section.id, section]));
        const sections = ids
          .map((id) => byId.get(id))
          .filter((section): section is NonNullable<typeof section> => Boolean(section));
        set({ charter: { ...charter, sections } });
      }
      alertHandler.addAlert({ status: 'success', defaultText: 'Порядок обновлён' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ reordering: false });
    }
  },
});
