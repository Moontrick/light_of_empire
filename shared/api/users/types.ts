import type { Formation, Position, UserRole } from '@/shared/types';

export interface UpdateProfileDto {
  login?: string;
  discord_id?: string;
  steam_url?: string;
}

export interface ChangePasswordDto {
  current_password: string;
  new_password: string;
}

export interface UserListItem {
  id: number;
  login: string;
  email: string;
  position: Position | null;
  discord_id: string | null;
  steam_url: string | null;
  formation: Formation | null;
  role: UserRole;
  created_at: string;
}

export interface AssignRoleDto {
  role: UserRole;
}

// Анкету пользователя правит админ; сам пользователь эти поля не меняет
export interface AdminUpdateUserProfileDto {
  position_id?: number | null;
  formation_id?: number | null;
}
