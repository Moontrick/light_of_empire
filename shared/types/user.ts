export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  CURATOR = 'CURATOR',
  OWNER = 'OWNER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

// Иерархия ролей: MEMBER < ADMIN < CURATOR < OWNER < SUPER_ADMIN
export const ROLE_WEIGHT: Record<UserRole, number> = {
  [UserRole.MEMBER]: 0,
  [UserRole.ADMIN]: 1,
  [UserRole.CURATOR]: 2,
  [UserRole.OWNER]: 3,
  [UserRole.SUPER_ADMIN]: 4,
};

export function hasRoleAtLeast(
  role: UserRole | null | undefined,
  minRole: UserRole,
): boolean {
  return role != null && ROLE_WEIGHT[role] >= ROLE_WEIGHT[minRole];
}

// Роли строго ниже указанной — ровно то, что актор может назначать другим
export function getRolesBelow(role: UserRole): UserRole[] {
  return Object.values(UserRole).filter(
    (candidate) => ROLE_WEIGHT[candidate] < ROLE_WEIGHT[role],
  );
}

// Общая форма справочников (formations, positions): color/styles — свободные
// строки для отрисовки на фронте, бэк их не интерпретирует
export interface DirectoryEntry {
  id: number;
  name: string;
  description?: string | null;
  color: string | null;
  styles: string | null;
}

export type Formation = DirectoryEntry;
export type Position = DirectoryEntry;

export interface UserProfile {
  email: string;
  login: string;
  position: Position | null;
  discord_id: string | null;
  steam_url: string | null;
  formation: Formation | null;
  role: UserRole;
}
