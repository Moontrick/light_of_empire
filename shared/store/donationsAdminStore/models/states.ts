import type { DonationsAdminState } from '../types';

export const InitState: DonationsAdminState = {
  items: [],
  listStatus: 'idle',
  saving: false,
  mutatingId: null,
  editable: null,
  editableStatus: 'idle',
};
