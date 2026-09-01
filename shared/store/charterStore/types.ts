import type { DocContent, DocSectionData } from '@/shared/types';

export type CharterStatus = 'idle' | 'loading' | 'ready' | 'empty' | 'error';

export type CharterDocSection = DocSectionData;

export type CharterDocument = DocContent;

export interface CharterState {
  charter: CharterDocument | null;
  status: CharterStatus;
  savingWrapper: boolean;
  savingSectionId: number | null;
  creatingSection: boolean;
  reordering: boolean;
}
