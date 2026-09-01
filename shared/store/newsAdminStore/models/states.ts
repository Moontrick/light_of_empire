import type { NewsAdminState } from '../types';

export const ADMIN_NEWS_PAGE_LIMIT = 20;

export const InitState: NewsAdminState = {
  items: [],
  total: 0,
  page: 1,
  limit: ADMIN_NEWS_PAGE_LIMIT,
  statusFilter: null,
  listStatus: 'idle',
  saving: false,
  mutatingId: null,
  editable: null,
  editableStatus: 'idle',
};
