import { create } from 'zustand';
import type { AuthState } from './types';
import { AuthActions, createAuthActions } from './models/actions';
import { InitState } from './models/states';

export const useAuthStore = create<AuthState & AuthActions>()((set, get, store) => ({
  ...InitState,
  ...createAuthActions(set, get, store),
}));

export type { AuthState, AuthStatus } from './types';
