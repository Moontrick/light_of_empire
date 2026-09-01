import type { DocSectionData } from '@/shared/types';

export interface SectionEditorProps {
  section: DocSectionData | null;
  onClose: () => void;
}
