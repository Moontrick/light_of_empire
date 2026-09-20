import { create } from 'zustand';
import type { DonationsState } from './types';
import { DonationsActions, createDonationsActions } from './models/actions';
import { InitState } from './models/states';

export const useDonationsStore = create<DonationsState & DonationsActions>()(
  (set, get, store) => ({
    ...InitState,
    ...createDonationsActions(set, get, store),
  }),
);

export { mapDonationDetailDto, mapDonationImageDto, mapDonationListItemDto } from './models/mappers';
export type { DonationDetailStatus, DonationsListStatus, DonationsState } from './types';
