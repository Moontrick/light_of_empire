import type { CombatOperation, CombatOperationDetail, NewsStatus } from '@/shared/types';

export type CombatOperationsAdminListStatus = 'idle' | 'loading' | 'ready' | 'error';
export type CombatOperationEditableStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface CombatOperationsAdminState {
  items: CombatOperation[];
  total: number;
  page: number;
  limit: number;
  statusFilter: NewsStatus | null;
  listStatus: CombatOperationsAdminListStatus;
  saving: boolean;
  mutatingId: number | null;
  editable: CombatOperationDetail | null;
  editableStatus: CombatOperationEditableStatus;
}
