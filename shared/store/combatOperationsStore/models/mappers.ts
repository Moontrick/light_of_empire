import type { CombatOperationDetailDto, CombatOperationListItemDto } from '@/shared/api/combatOperations';
import type { CombatOperation, CombatOperationDetail } from '@/shared/types';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';
import { getCoverUrl } from '@/shared/utils/getCoverUrl';

export function mapCombatOperationListItemDto(dto: CombatOperationListItemDto): CombatOperation {
  const isoDate = (dto.published_at ?? dto.created_at).slice(0, 10);
  // URL image-service immutable: смена обложки меняет сам URL, cache-busting не нужен
  const imageUrl = getCoverUrl(dto.image_url);

  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    tag: dto.tag,
    smallBody: dto.small_body,
    imageUrl,
    status: dto.status,
    isoDate,
    date: formatNewsDate(isoDate),
    publishedAt: dto.published_at,
    createdAt: dto.created_at,
    changedAt: dto.changed_at,
    isSendToDiscord: dto.is_send_to_discord,
  };
}

export function mapCombatOperationDetailDto(dto: CombatOperationDetailDto): CombatOperationDetail {
  return {
    ...mapCombatOperationListItemDto(dto),
    body: dto.body,
  };
}
