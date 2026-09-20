import type {
  DonationBaseDto,
  DonationDetailDto,
  DonationImageDto,
  DonationListItemDto,
} from '@/shared/api/donations';
import type { DonationDetail, DonationImage, DonationListItem } from '@/shared/types';
import { getCoverUrl } from '@/shared/utils/getCoverUrl';

export function mapDonationImageDto(dto: DonationImageDto): DonationImage {
  return { id: dto.id, seq: dto.seq, url: getCoverUrl(dto.url) ?? dto.url };
}

function mapDonationBase(dto: DonationBaseDto): Omit<DonationListItem, 'smallBody'> {
  // seq не обязан быть сплошным после удалений — сортируем, а не индексируем
  const images = [...dto.images].sort((a, b) => a.seq - b.seq).map(mapDonationImageDto);
  return {
    id: dto.id,
    title: dto.title,
    price: dto.price,
    isActive: dto.is_active,
    images,
    coverUrl: images[0]?.url ?? null,
    createdAt: dto.created_at,
    changedAt: dto.changed_at,
  };
}

export function mapDonationListItemDto(dto: DonationListItemDto): DonationListItem {
  return { ...mapDonationBase(dto), smallBody: dto.small_body };
}

export function mapDonationDetailDto(dto: DonationDetailDto): DonationDetail {
  return { ...mapDonationBase(dto), body: dto.body };
}
