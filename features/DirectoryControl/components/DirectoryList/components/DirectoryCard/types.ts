import type { DirectoryEntry } from '@/shared/types';

export interface DirectoryCardProps {
  entry: DirectoryEntry;
  canManage: boolean;
  deleting: boolean;
  deleteConfirm: string;
  deleteWarning: string;
  onEdit: () => void;
  onDelete: () => void;
}
