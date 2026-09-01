import type { ReactNode } from 'react';
import type { DocSectionData } from '@/shared/types';

export interface EditableSectionProps {
  section: DocSectionData;
  editing: boolean;
  onEdit: () => void;
  onClose: () => void;
  toolbar?: ReactNode; // стрелки порядка и удаление добавит Task 12
}
