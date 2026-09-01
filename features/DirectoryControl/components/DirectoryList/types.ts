import type { DirectoryEntry } from '@/shared/types';

export interface DirectoryListProps {
  entries: DirectoryEntry[];
  loading: boolean;
  canManage: boolean;
  deletingId: number | null;
  emptyText: string;
  deleteConfirm: string;
  deleteWarning: string;
  onEdit: (entry: DirectoryEntry) => void;
  onDelete: (entry: DirectoryEntry) => void;
}
