import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import type { CreateCombatOperationDto, UpdateCombatOperationDto } from '@/shared/api/combatOperations';
import { combatOperationsApi } from '@/shared/api/combatOperations';
import { NewsStatus } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import {
  mapCombatOperationDetailDto,
  mapCombatOperationListItemDto,
} from '@/shared/store/combatOperationsStore';
import type { CombatOperationsAdminState } from '../types';

export interface CombatOperationsAdminActions {
  fetchList: (page?: number) => Promise<void>;
  setStatusFilter: (status: NewsStatus | null) => void;
  fetchEditable: (slug: string) => Promise<void>;
  resetEditable: () => void;
  create: (dto: CreateCombatOperationDto) => Promise<boolean>;
  update: (id: number, dto: UpdateCombatOperationDto) => Promise<boolean>;
  publish: (id: number) => Promise<boolean>;
  archive: (id: number) => Promise<boolean>;
  sendToDiscord: (id: number) => Promise<boolean>;
  changeDiscordStatus: (id: number) => Promise<boolean>;
}

const MUTATION_ERRORS: Record<number, string> = {
  403: 'Недостаточно прав',
  404: 'Операция не найдена — обновите страницу',
  409: 'Такой slug уже занят',
};

const DISCORD_ERRORS: Record<number, string> = {
  403: 'Недостаточно прав',
  404: 'Операция не найдена — обновите страницу',
  409: 'Отправить нельзя: операция не опубликована, уже отправлена или не задан канал боевых операций',
};

function showError(error: unknown, messages: Record<number, string> = MUTATION_ERRORS) {
  alertHandler.addAlert({ defaultText: getApiErrorMessage(error, messages) });
}

export const createCombatOperationsAdminActions: StateCreator<
  CombatOperationsAdminState & CombatOperationsAdminActions,
  [],
  [],
  CombatOperationsAdminActions
> = (set, get) => ({
  fetchList: async (page) => {
    const { limit, statusFilter } = get();
    const targetPage = page ?? get().page;
    set({ listStatus: 'loading' });
    try {
      const { data } = await combatOperationsApi.getList({
        page: targetPage,
        limit,
        status: statusFilter ?? undefined,
      });
      set({
        items: data.items.map(mapCombatOperationListItemDto),
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
      const { data } = await combatOperationsApi.getBySlug(slug);
      set({ editable: mapCombatOperationDetailDto(data), editableStatus: 'ready' });
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

  create: async (dto) => {
    set({ saving: true });
    try {
      await combatOperationsApi.create(dto);
      alertHandler.addAlert({ status: 'success', defaultText: 'Операция создана' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  update: async (id, dto) => {
    set({ saving: true });
    try {
      await combatOperationsApi.update(id, dto);
      alertHandler.addAlert({ status: 'success', defaultText: 'Операция сохранена' });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  publish: async (id) => {
    set({ mutatingId: id });
    try {
      await combatOperationsApi.update(id, { status: NewsStatus.PUBLISHED });
      alertHandler.addAlert({ status: 'success', defaultText: 'Операция опубликована' });
      await get().fetchList();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ mutatingId: null });
    }
  },

  archive: async (id) => {
    set({ mutatingId: id });
    try {
      await combatOperationsApi.archive(id);
      alertHandler.addAlert({ status: 'success', defaultText: 'Операция перенесена в архив' });
      await get().fetchList();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ mutatingId: null });
    }
  },

  // Список не перезапрашиваем: из редактора это лишний запрос, таблица обновляет себя сама
  sendToDiscord: async (id) => {
    set({ mutatingId: id });
    try {
      await combatOperationsApi.sendToDiscord(id);
      alertHandler.addAlert({ status: 'success', defaultText: 'Операция отправлена в Discord' });
      return true;
    } catch (error) {
      showError(error, DISCORD_ERRORS);
      return false;
    } finally {
      set({ mutatingId: null });
    }
  },

  changeDiscordStatus: async (id) => {
    set({ mutatingId: id });
    try {
      await combatOperationsApi.changeSendToDiscordStatus(id);
      alertHandler.addAlert({ status: 'success', defaultText: 'Отметка об отправке в Discord снята' });
      return true;
    } catch (error) {
      showError(error, DISCORD_ERRORS);
      return false;
    } finally {
      set({ mutatingId: null });
    }
  },
});
