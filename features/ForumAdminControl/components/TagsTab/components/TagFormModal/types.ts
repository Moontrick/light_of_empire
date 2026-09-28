import type { ColorPickerValue } from '@/shared/utils/toColorString';
import type { EditingTag } from '../../../../types';

export interface TagFormModalProps {
  editing: EditingTag;
  onClose: () => void;
}

export interface TagFormValues {
  name: string;
  color?: string | ColorPickerValue | null;
  formation_id?: number | null;
}
