import { create } from 'zustand';
import type { ForumState } from './types';
import { ForumActions, createForumActions } from './models/actions';
import { InitState } from './models/states';

export const useForumStore = create<ForumState & ForumActions>()((set, get, store) => ({
  ...InitState,
  ...createForumActions(set, get, store),
}));

export type {
  ForumDetailStatus,
  ForumListStatus,
  ForumLoadStatus,
  ForumState,
  ForumThreadsFilters,
} from './types';
