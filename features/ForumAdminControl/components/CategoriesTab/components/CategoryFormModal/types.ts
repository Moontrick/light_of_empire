import type { EditingCategory } from '../../../../types';

export interface CategoryFormModalProps {
  editing: EditingCategory;
  onClose: () => void;
}

export interface CategoryFormValues {
  name: string;
  description?: string;
  is_archived?: boolean;
}
