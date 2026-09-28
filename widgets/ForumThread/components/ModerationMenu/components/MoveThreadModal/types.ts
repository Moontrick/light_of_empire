import type { ForumCategory } from '@/shared/types';

export interface MoveThreadModalProps {
  open: boolean;
  loading: boolean;
  categories: ForumCategory[];
  onSubmit: (categoryId: number) => void;
  onCancel: () => void;
}
