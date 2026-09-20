import type { CombatOperationsAdminState } from '../types';

export const ADMIN_COMBAT_OPERATIONS_PAGE_LIMIT = 20;

export const InitState: CombatOperationsAdminState = {
  items: [],
  total: 0,
  page: 1,
  limit: ADMIN_COMBAT_OPERATIONS_PAGE_LIMIT,
  statusFilter: null,
  listStatus: 'idle',
  saving: false,
  mutatingId: null,
  editable: null,
  editableStatus: 'idle',
};
