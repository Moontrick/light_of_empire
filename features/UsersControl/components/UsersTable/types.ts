import type { UserListItem } from '@/shared/api/users';
import type { UserRole } from '@/shared/types';

export interface UsersTableProps {
  users: UserListItem[];
  loading: boolean;
  actorRole: UserRole;
  savingRoleId: number | null;
  removingAvatarId: number | null;
  onChangeRole: (target: UserListItem, role: UserRole) => Promise<void>;
  onEdit: (target: UserListItem) => void;
  onRemoveAvatar: (target: UserListItem) => Promise<void>;
}
