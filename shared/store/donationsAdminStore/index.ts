import { create } from 'zustand';
import type { DonationsAdminState } from './types';
import type { DonationsAdminActions } from './models/actions';
import { createDonationsAdminActions } from './models/actions';
import { InitState } from './models/states';

export const useDonationsAdminStore = create<DonationsAdminState & DonationsAdminActions>()(
  (set, get, store) => ({
    ...InitState,
    ...createDonationsAdminActions(set, get, store),
  }),
);

export type { DonationEditableStatus, DonationsAdminListStatus, DonationsAdminState } from './types';
