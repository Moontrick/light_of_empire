import type { UserProfile } from '@/shared/types';
import { baseService } from '../api';
import { AUTH_ROUTES } from './routes';
import type {
  AuthTokenResponse,
  LoginDto,
  LogoutResponse,
  RegisterDto,
  RegisterResponse,
  ResendCodeDto,
  VerifyEmailDto,
} from './types';

export const authApi = {
  register: (dto: RegisterDto) =>
    baseService.post<RegisterResponse>(AUTH_ROUTES.REGISTER, dto, {
      skipAuthRefresh: true,
    }),

  verify: (dto: VerifyEmailDto) =>
    baseService.post<AuthTokenResponse>(AUTH_ROUTES.VERIFY, dto, {
      skipAuthRefresh: true,
    }),

  resendCode: (dto: ResendCodeDto) =>
    baseService.post<RegisterResponse>(AUTH_ROUTES.RESEND_CODE, dto, {
      skipAuthRefresh: true,
    }),

  login: (dto: LoginDto) =>
    baseService.post<AuthTokenResponse>(AUTH_ROUTES.LOGIN, dto, {
      skipAuthRefresh: true,
    }),

  logout: () => baseService.post<LogoutResponse>(AUTH_ROUTES.LOGOUT),

  getMe: () => baseService.get<UserProfile>(AUTH_ROUTES.ME),
};
