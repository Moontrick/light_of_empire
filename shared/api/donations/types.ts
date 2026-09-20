import type { NewsBlock } from '@/shared/types';

export interface DonationImageDto {
  id: number;
  seq: number;
  url: string; // относительный, от хоста API
}

export interface DonationBaseDto {
  id: number;
  title: string;
  price: number;
  is_active: boolean;
  images: DonationImageDto[];
  created_at: string;
  changed_at: string;
}

export interface DonationListItemDto extends DonationBaseDto {
  small_body: string;
}

export interface DonationDetailDto extends DonationBaseDto {
  body: NewsBlock[];
}

export interface DonationListParams {
  // Только для OWNER+, остальным сервер отдаёт активные независимо от параметра
  is_active?: boolean;
}

export interface CreateDonationDto {
  title: string;
  body?: NewsBlock[];
  price: number;
  is_active?: boolean;
}

// Частичное обновление: null не допускается
export type UpdateDonationDto = Partial<CreateDonationDto>;

export interface AddDonationImageDto {
  image: string; // data-URL
}
