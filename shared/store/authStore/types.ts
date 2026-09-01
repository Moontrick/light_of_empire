import type { UserProfile } from '@/shared/types';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'guest';

export interface AuthState {
  user: UserProfile | null;
  status: AuthStatus;
}
