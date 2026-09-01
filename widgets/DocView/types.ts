import type { ReactNode } from 'react';
import type { CharterBlock, DocContent } from '@/shared/types';

export interface DocWrapperInput {
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  footer: string;
  search_placeholder?: string | null;
}

export interface DocSectionCreateInput {
  title: string;
  slug?: string;
  blocks?: CharterBlock[];
}

export interface DocSectionUpdateInput {
  title?: string;
  slug?: string;
  blocks?: CharterBlock[];
}

export interface DocEditorOps {
  saveWrapper: (dto: DocWrapperInput) => Promise<boolean>;
  createSection: (dto: DocSectionCreateInput) => Promise<boolean>;
  updateSection: (id: number, dto: DocSectionUpdateInput) => Promise<boolean>;
  deleteSection: (id: number) => Promise<boolean>;
  reorderSections: (ids: number[]) => Promise<boolean>;
}

export interface DocEditorFlags {
  savingWrapper: boolean;
  savingSectionId: number | null;
  creatingSection: boolean;
  reordering: boolean;
}

export interface DocEditorContextValue {
  ops: DocEditorOps;
  flags: DocEditorFlags;
}

export interface DocViewProps {
  doc: DocContent;
  canEdit: boolean;
  banner?: ReactNode;
}
