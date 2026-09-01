import type { UserListItem } from '@/shared/api/users';
import type { Formation, Position } from '@/shared/types';

export interface EditUserModalProps {
  user: UserListItem | null;
  onClose: () => void;
  onSaved: (
    userId: number,
    changes: { position: Position | null; formation: Formation | null },
  ) => void;
}

export interface EditUserFormValues {
  position_id?: number | null;
  formation_id?: number | null;
}
