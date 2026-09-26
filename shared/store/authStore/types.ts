import type { UserProfile } from '@/shared/types';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'guest';

// Незавершённая регистрация: email, на который ушёл код, и срок кода (ISO).
// codeExpiresAt === null — пришли со входа (403), срок кода неизвестен.
export interface PendingVerification {
  email: string;
  codeExpiresAt: string | null;
}

export interface AuthState {
  user: UserProfile | null;
  status: AuthStatus;
  pendingVerification: PendingVerification | null;
}
