import type { CharterBlock } from '@/shared/types';
import type { CharterAuditActor } from '@/shared/api/charter';

export type PageStatus = 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | 'DELETED';

export interface PageTreeNodeDto {
  id: number;
  slug: string;
  name: string;
  status: PageStatus;
  parent_id: number | null;
  seq_number: number;
  children: PageTreeNodeDto[];
}

export interface PageSectionDto {
  id: number;
  slug: string;
  title: string;
  seq_number: number;
  blocks: CharterBlock[];
  created_at: string;
  changed_at: string;
  created_by?: CharterAuditActor | null;
  changed_by?: CharterAuditActor | null;
}

// В ответах POST/PUT sections не приходят — поле опциональное
export interface PageDto {
  id: number;
  slug: string;
  name: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  footer: string;
  search_placeholder: string | null;
  status: PageStatus;
  parent_id: number | null;
  seq_number: number;
  created_at: string;
  changed_at: string;
  created_by?: CharterAuditActor | null;
  changed_by?: CharterAuditActor | null;
  sections?: PageSectionDto[];
}

export interface CreatePageDto {
  name: string;
  slug?: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  footer: string;
  search_placeholder?: string | null;
  status?: PageStatus;
  parent_id?: number | null;
  seq_number?: number;
}

// Частичное обновление; null допустим только в parent_id и search_placeholder
export interface UpdatePageDto {
  name?: string;
  slug?: string;
  hero_eyebrow?: string;
  hero_title?: string;
  hero_intro?: string;
  footer?: string;
  search_placeholder?: string | null;
  status?: PageStatus;
  parent_id?: number | null;
  seq_number?: number;
}

export interface ReorderPagesDto {
  parent_id?: number | null;
  ids: number[];
}

export interface CreatePageSectionDto {
  title: string;
  slug?: string;
  blocks?: CharterBlock[];
  seq_number?: number;
}

export interface UpdatePageSectionDto {
  title?: string;
  slug?: string;
  blocks?: CharterBlock[];
  seq_number?: number;
}
