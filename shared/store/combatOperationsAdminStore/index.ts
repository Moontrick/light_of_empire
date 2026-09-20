import { create } from 'zustand';
import type { CombatOperationsAdminState } from './types';
import type { CombatOperationsAdminActions } from './models/actions';
import { createCombatOperationsAdminActions } from './models/actions';
import { InitState, ADMIN_COMBAT_OPERATIONS_PAGE_LIMIT } from './models/states';

export const useCombatOperationsAdminStore = create<
  CombatOperationsAdminState & CombatOperationsAdminActions
>()((set, get, store) => ({
  ...InitState,
  ...createCombatOperationsAdminActions(set, get, store),
}));

export { ADMIN_COMBAT_OPERATIONS_PAGE_LIMIT };
export type {
  CombatOperationEditableStatus,
  CombatOperationsAdminListStatus,
  CombatOperationsAdminState,
} from './types';
