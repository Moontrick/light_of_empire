import type { CharterBlock } from '@/shared/types';

// created_by/changed_by приходят только OWNER и ADMIN, остальным ключей нет
export interface CharterAuditActor {
  email: string;
  login: string;
}

export interface CharterSectionDto {
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

export interface CharterWrapperDto {
  id: number;
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  footer: string;
  search_placeholder: string | null;
  created_at: string;
  changed_at: string;
  created_by?: CharterAuditActor | null;
  changed_by?: CharterAuditActor | null;
}

export interface CharterDto extends CharterWrapperDto {
  sections: CharterSectionDto[];
}

// PUT /charter — полная замена: шлём все поля целиком
export interface UpdateCharterDto {
  hero_eyebrow: string;
  hero_title: string;
  hero_intro: string;
  footer: string;
  search_placeholder?: string | null;
}

export interface CreateSectionDto {
  title: string;
  slug?: string;
  blocks?: CharterBlock[];
  seq_number?: number;
}

// Частичное обновление; null в полях недопустим (400 от бэка)
export interface UpdateSectionDto {
  title?: string;
  slug?: string;
  blocks?: CharterBlock[];
  seq_number?: number;
}
