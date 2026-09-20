import type { NewsBlock, NewsStatus } from '@/shared/types';

export interface CombatOperationListItemDto {
  id: number;
  slug: string;
  title: string;
  tag: string;
  small_body: string;
  image_url: string | null;
  status: NewsStatus;
  is_send_to_discord: boolean;
  published_at: string | null;
  created_at: string;
  changed_at: string;
}

export interface CombatOperationListResponseDto {
  items: CombatOperationListItemDto[];
  total: number;
  page: number;
  limit: number;
}

export interface CombatOperationDetailDto extends CombatOperationListItemDto {
  body: NewsBlock[];
}

export interface CombatOperationListParams {
  page?: number;
  limit?: number;
  tag?: string;
  status?: NewsStatus;
}

export interface CreateCombatOperationDto {
  title: string;
  tag: string;
  slug?: string;
  body?: NewsBlock[];
  // data-URL; null очищает обложку
  image?: string | null;
  image_mime?: string;
  status?: NewsStatus;
  published_at?: string | null;
}

export type UpdateCombatOperationDto = Partial<CreateCombatOperationDto>;
