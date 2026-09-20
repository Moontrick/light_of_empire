import { isAxiosError } from 'axios';
import { StateCreator } from 'zustand';
import { donationsApi } from '@/shared/api/donations';
import { alertHandler } from '@/shared/utils/alertHandler';
import { getApiErrorMessage } from '@/shared/utils/getApiErrorMessage';
import type { DonationsState } from '../types';
import { mapDonationDetailDto, mapDonationListItemDto } from './mappers';

export interface DonationsActions {
  fetchList: () => Promise<void>;
  fetchDetail: (id: number) => Promise<void>;
  resetDetail: () => void;
}

export const createDonationsActions: StateCreator<
  DonationsState & DonationsActions,
  [],
  [],
  DonationsActions
> = (set) => ({
  // is_active явно: OWNER без параметра получил бы и скрытые товары
  fetchList: async () => {
    set({ listStatus: 'loading' });
    try {
      const { data } = await donationsApi.getList({ is_active: true });
      set({ items: data.map(mapDonationListItemDto), listStatus: 'ready' });
    } catch (error) {
      set({ listStatus: 'error' });
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    }
  },

  fetchDetail: async (id) => {
    set({ detail: null, detailStatus: 'loading' });
    try {
      const { data } = await donationsApi.getById(id);
      set({ detail: mapDonationDetailDto(data), detailStatus: 'ready' });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        set({ detailStatus: 'notFound' });
        return;
      }
      set({ detailStatus: 'error' });
      alertHandler.addAlert({ defaultText: getApiErrorMessage(error) });
    }
  },

  resetDetail: () => set({ detail: null, detailStatus: 'idle' }),
});
