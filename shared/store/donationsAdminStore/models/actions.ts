import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import type { CreateDonationDto, UpdateDonationDto } from '@/shared/api/donations';
import { donationsApi } from '@/shared/api/donations';
import { DONATION_IMAGES_MAX } from '@/shared/constants';
import type { DonationDetail, DonationImage } from '@/shared/types';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getError } from '@/shared/utils/getError';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import {
  mapDonationDetailDto,
  mapDonationImageDto,
  mapDonationListItemDto,
} from '@/shared/store/donationsStore';
import type { DonationsAdminState } from '../types';

export interface DonationsAdminActions {
  fetchList: () => Promise<void>;
  fetchEditable: (id: number) => Promise<void>;
  resetEditable: () => void;
  create: (dto: CreateDonationDto) => Promise<DonationDetail | null>;
  update: (id: number, dto: UpdateDonationDto) => Promise<boolean>;
  setActive: (id: number, isActive: boolean) => Promise<boolean>;
  addImage: (id: number, dataUrl: string) => Promise<DonationImage | null>;
  deleteImage: (id: number, imageId: number) => Promise<boolean>;
}

const MUTATION_ERRORS: Record<number, string> = {
  403: 'Недостаточно прав',
  404: 'Товар не найден — обновите страницу',
};

// Бэк различает два 409 по тексту message; лимит — окончательный, конфликт слота — повторяем
const isSlotConflict = (error: unknown) =>
  isAxiosError(error) &&
  error.response?.status === 409 &&
  (getError(error) ?? '').startsWith('Image slot conflict');

function imageErrorText(error: unknown): string {
  if (isAxiosError(error) && error.response?.status === 409) {
    return isSlotConflict(error)
      ? 'Не удалось добавить картинку, попробуйте ещё раз'
      : `Достигнут лимит картинок (${DONATION_IMAGES_MAX})`;
  }
  // 400 — текст причины от сервера (не картинка, mime, размер)
  return getApiErrorMessage(error, MUTATION_ERRORS);
}

function showError(error: unknown) {
  alertHandler.addAlert({ defaultText: getApiErrorMessage(error, MUTATION_ERRORS) });
}

export const createDonationsAdminActions: StateCreator<
  DonationsAdminState & DonationsAdminActions,
  [],
  [],
  DonationsAdminActions
> = (set, get) => ({
  fetchList: async () => {
    set({ listStatus: 'loading' });
    try {
      const { data } = await donationsApi.getList();
      set({ items: data.map(mapDonationListItemDto), listStatus: 'ready' });
    } catch (error) {
      set({ listStatus: 'error' });
      showError(error);
    }
  },

  fetchEditable: async (id) => {
    set({ editable: null, editableStatus: 'loading' });
    try {
      const { data } = await donationsApi.getById(id);
      set({ editable: mapDonationDetailDto(data), editableStatus: 'ready' });
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
      const { data } = await donationsApi.create(dto);
      return mapDonationDetailDto(data);
    } catch (error) {
      showError(error);
      return null;
    } finally {
      set({ saving: false });
    }
  },

  update: async (id, dto) => {
    set({ saving: true });
    try {
      await donationsApi.update(id, dto);
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ saving: false });
    }
  },

  setActive: async (id, isActive) => {
    set({ mutatingId: id });
    try {
      await donationsApi.update(id, { is_active: isActive });
      alertHandler.addAlert({
        status: 'success',
        defaultText: isActive ? 'Товар показан на витрине' : 'Товар скрыт с витрины',
      });
      await get().fetchList();
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ mutatingId: null });
    }
  },

  addImage: async (id, dataUrl) => {
    const send = () => donationsApi.addImage(id, { image: dataUrl });
    try {
      let response;
      try {
        response = await send();
      } catch (error) {
        if (!isSlotConflict(error)) throw error;
        response = await send();
      }
      return mapDonationImageDto(response.data);
    } catch (error) {
      alertHandler.addAlert({ defaultText: imageErrorText(error) });
      return null;
    }
  },

  deleteImage: async (id, imageId) => {
    try {
      await donationsApi.deleteImage(id, imageId);
      return true;
    } catch (error) {
      showError(error);
      return false;
    }
  },
});
