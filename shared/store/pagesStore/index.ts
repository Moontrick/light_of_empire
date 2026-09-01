import { create } from 'zustand';
import type { PagesState } from './types';
import { PagesActions, createPagesActions } from './models/actions';
import { InitState } from './models/states';

export const usePagesStore = create<PagesState & PagesActions>()((set, get, store) => ({
  ...InitState,
  ...createPagesActions(set, get, store),
}));

export type { PageDocument, PagesState, PagesTreeStatus, PageViewStatus } from './types';
