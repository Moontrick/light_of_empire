import { create } from 'zustand';
import type { CharterState } from './types';
import { CharterActions, createCharterActions } from './models/actions';
import { InitState } from './models/states';

export const useCharterStore = create<CharterState & CharterActions>()((set, get, store) => ({
  ...InitState,
  ...createCharterActions(set, get, store),
}));

export type { CharterDocSection, CharterDocument, CharterState, CharterStatus } from './types';
