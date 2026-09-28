import type { ForumCategory } from '@/shared/types';

export interface CategoryCardProps {
  category: ForumCategory;
  canMoveUp: boolean;
  canMoveDown: boolean;
  // Любая мутация стора — все кнопки списка заблокированы
  disabled: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  onToggleArchive: () => void;
  onDelete: () => void;
}
