import type { NewsBlock, NewsStatus } from '@/shared/types';

export interface NewsListItemDto {
  id: number;
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  small_body: string;
  image_url: string | null;
  reading_minutes: number;
  status: NewsStatus;
  published_at: string | null;
  created_at: string;
  changed_at: string;
  is_send_to_discord?: boolean;
}

export interface NewsListResponseDto {
  items: NewsListItemDto[];
  total: number;
  page: number;
  limit: number;
}

export interface NewsDetailDto extends NewsListItemDto {
  lead: string | null;
  body: NewsBlock[];
}

export interface NewsListParams {
  page?: number;
  limit?: number;
  tag?: string;
  status?: NewsStatus;
}

export interface CreateNewsDto {
  title: string;
  tag: string;
  excerpt: string;
  slug?: string;
  lead?: string;
  body?: NewsBlock[];
  // data-URL; null очищает обложку
  image?: string | null;
  image_mime?: string;
  status?: NewsStatus;
  published_at?: string | null;
}

export type UpdateNewsDto = Partial<CreateNewsDto>;
