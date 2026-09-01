import { create } from 'zustand';
import type { NewsAdminState } from './types';
import type { NewsAdminActions } from './models/actions';
import { createNewsAdminActions } from './models/actions';
import { InitState, ADMIN_NEWS_PAGE_LIMIT } from './models/states';

export const useNewsAdminStore = create<NewsAdminState & NewsAdminActions>()((set, get, store) => ({
  ...InitState,
  ...createNewsAdminActions(set, get, store),
}));

export { ADMIN_NEWS_PAGE_LIMIT };
export type { NewsAdminState, NewsAdminListStatus, NewsEditableStatus } from './types';
