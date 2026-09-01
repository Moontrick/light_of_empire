import type { CharterState } from '../types';

export const InitState: CharterState = {
  charter: null,
  status: 'idle',
  savingWrapper: false,
  savingSectionId: null,
  creatingSection: false,
  reordering: false,
};
