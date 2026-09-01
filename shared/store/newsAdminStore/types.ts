import type { NewsPost, NewsPostDetail, NewsStatus } from '@/shared/types';

export type NewsAdminListStatus = 'idle' | 'loading' | 'ready' | 'error';
export type NewsEditableStatus = 'idle' | 'loading' | 'ready' | 'notFound' | 'error';

export interface NewsAdminState {
  items: NewsPost[];
  total: number;
  page: number;
  limit: number;
  statusFilter: NewsStatus | null;
  listStatus: NewsAdminListStatus;
  saving: boolean;
  mutatingId: number | null;
  editable: NewsPostDetail | null;
  editableStatus: NewsEditableStatus;
}
