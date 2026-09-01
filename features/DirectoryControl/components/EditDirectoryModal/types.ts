import type { ColorPickerValue } from '../../lib/toColorString';
import type { DirectoryConfig, EditingEntry } from '../../types';

export interface EditDirectoryModalProps {
  config: DirectoryConfig;
  editing: EditingEntry;
  onClose: () => void;
  onSaved: () => void;
}

export interface DirectoryFormValues {
  name: string;
  description?: string;
  color?: string | ColorPickerValue | null;
  stylePresets?: string[];
}
