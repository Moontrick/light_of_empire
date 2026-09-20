import { create } from 'zustand';
import type { CombatOperationsState } from './types';
import { CombatOperationsActions, createCombatOperationsActions } from './models/actions';
import { InitState, COMBAT_OPERATIONS_PAGE_LIMIT } from './models/states';

export const useCombatOperationsStore = create<CombatOperationsState & CombatOperationsActions>()(
  (set, get, store) => ({
    ...InitState,
    ...createCombatOperationsActions(set, get, store),
  }),
);

export { COMBAT_OPERATIONS_PAGE_LIMIT };
export { mapCombatOperationListItemDto, mapCombatOperationDetailDto } from './models/mappers';
export type {
  CombatOperationArticleStatus,
  CombatOperationsFeedStatus,
  CombatOperationsState,
} from './types';
