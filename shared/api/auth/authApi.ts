import type { UserProfile } from '@/shared/types';
import { baseService } from '../api';
import { AUTH_ROUTES } from './routes';
import type { AuthTokenResponse, LoginDto, LogoutResponse, RegisterDto } from './types';

export const authApi = {
  register: (dto: RegisterDto) =>
    baseService.post<AuthTokenResponse>(AUTH_ROUTES.REGISTER, dto, {
      skipAuthRefresh: true,
    }),

  login: (dto: LoginDto) =>
    baseService.post<AuthTokenResponse>(AUTH_ROUTES.LOGIN, dto, {
      skipAuthRefresh: true,
    }),

  logout: () => baseService.post<LogoutResponse>(AUTH_ROUTES.LOGOUT),

  getMe: () => baseService.get<UserProfile>(AUTH_ROUTES.ME),
};
