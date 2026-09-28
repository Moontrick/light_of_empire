import type { ForumState } from '../types';

export const InitState: ForumState = {
  categories: [],
  categoriesStatus: 'idle',
  tags: [],
  tagsStatus: 'idle',

  threads: [],
  threadsTotal: 0,
  threadsPage: 1,
  threadsFilters: null,
  threadsStatus: 'idle',

  thread: null,
  threadStatus: 'idle',
  posts: [],
  postsTotal: 0,
  postsPage: 1,
  postsStatus: 'idle',

  mutating: false,

  threadRequestId: 0,
};
