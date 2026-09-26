import { StateCreator } from 'zustand';
import { authApi, LoginDto, RegisterDto, VerifyEmailDto } from '@/shared/api/auth';
import { refreshSession } from '@/shared/api/api';
import { clearAccessToken, setAccessToken } from '@/shared/api/accessToken';
import type { AuthState } from '../types';

export interface AuthActions {
  initSession: () => Promise<void>;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  verifyEmail: (dto: VerifyEmailDto) => Promise<void>;
  resendCode: (email: string) => Promise<string>;
  startVerification: (email: string) => void;
  cancelVerification: () => void;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
  reset: () => void;
  setBalance: (balance: number) => void;
}

export const createAuthActions: StateCreator<
  AuthState & AuthActions,
  [],
  [],
  AuthActions
> = (set, get) => ({
  initSession: async () => {
    // Строгий режим/повторный монтаж провайдера не должны запускать второй refresh
    if (get().status !== 'idle') return;

    set({ status: 'loading' });
    try {
      await refreshSession();
      await get().fetchMe();
    } catch {
      // 401 без куки — штатный гость, а не ошибка
      set({ user: null, status: 'guest' });
    }
  },

  login: async (dto) => {
    const { data } = await authApi.login(dto);
    setAccessToken(data.access_token);
    await get().fetchMe();
  },

  // Токенов register больше не выдаёт — сессия появится после verifyEmail
  register: async (dto) => {
    const { data } = await authApi.register(dto);
    set({ pendingVerification: { email: data.email, codeExpiresAt: data.code_expires_at } });
  },

  verifyEmail: async (dto) => {
    const { data } = await authApi.verify(dto);
    setAccessToken(data.access_token);
    await get().fetchMe();
    set({ pendingVerification: null });
  },

  resendCode: async (email) => {
    const { data } = await authApi.resendCode({ email });
    set({ pendingVerification: { email: data.email, codeExpiresAt: data.code_expires_at } });
    return data.code_expires_at;
  },

  startVerification: (email) => {
    set({ pendingVerification: { email, codeExpiresAt: null } });
  },

  cancelVerification: () => {
    set({ pendingVerification: null });
  },

  fetchMe: async () => {
    const { data } = await authApi.getMe();
    set({ user: data, status: 'authenticated' });
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {
      // Access истёк или сеть недоступна — по контракту достаточно
      // забыть токен на клиенте, refresh-кука отзовётся по TTL.
    } finally {
      get().reset();
    }
  },

  reset: () => {
    clearAccessToken();
    set({ user: null, status: 'guest' });
  },

  setBalance: (balance) => {
    const { user } = get();
    if (user) set({ user: { ...user, balance } });
  },
});
