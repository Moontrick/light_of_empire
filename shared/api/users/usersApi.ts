import type { StatusResponse, UserRole } from '@/shared/types';
import { baseService } from '../api';
import { USERS_ROUTES } from './routes';
import type {
  AdminUpdateUserProfileDto,
  ChangePasswordDto,
  UpdateProfileDto,
  UserListItem,
} from './types';

export const usersApi = {
  updateProfile: (dto: UpdateProfileDto) =>
    baseService.put<StatusResponse>(USERS_ROUTES.UPDATE_MY_PROFILE, dto),

  changePassword: (dto: ChangePasswordDto) =>
    baseService.put<StatusResponse>(USERS_ROUTES.CHANGE_MY_PASSWORD, dto),

  getUsers: () => baseService.get<UserListItem[]>(USERS_ROUTES.LIST),

  assignRole: (id: number, role: UserRole) =>
    baseService.patch<StatusResponse>(USERS_ROUTES.ASSIGN_ROLE(id), { role }),

  updateUserProfile: (id: number, dto: AdminUpdateUserProfileDto) =>
    baseService.patch<StatusResponse>(USERS_ROUTES.UPDATE_USER_PROFILE(id), dto),
};
