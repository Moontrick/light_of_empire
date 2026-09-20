import type { PurchaseDto, PurchaseFullDto } from '@/shared/api/purchases';
import type { Purchase, PurchaseFull } from '@/shared/types';
import { getCoverUrl } from '../getCoverUrl';

export function mapPurchaseDto(dto: PurchaseDto): Purchase {
  return {
    id: dto.id,
    status: dto.status,
    price: dto.price,
    steamUrl: dto.steam_url,
    userComment: dto.user_comment,
    resolutionComment: dto.resolution_comment,
    createdAt: dto.created_at,
    processedAt: dto.processed_at,
    donation: {
      id: dto.donation.id,
      title: dto.donation.title,
      coverUrl: getCoverUrl(dto.donation.cover_url),
    },
  };
}

export function mapPurchaseFullDto(dto: PurchaseFullDto): PurchaseFull {
  return {
    ...mapPurchaseDto(dto),
    user: dto.user,
    processedBy: dto.processed_by,
  };
}
