import type { PagesState } from '../types';

export const InitState: PagesState = {
  tree: [],
  treeStatus: 'idle',
  page: null,
  pageSlug: null,
  pageStatus: 'idle',
  savingWrapper: false,
  savingSectionId: null,
  creatingSection: false,
  reordering: false,
  savingTree: false,
  summaries: {},
};
