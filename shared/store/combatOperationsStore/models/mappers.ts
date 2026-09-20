import type { CombatOperationDetailDto, CombatOperationListItemDto } from '@/shared/api/combatOperations';
import type { CombatOperation, CombatOperationDetail } from '@/shared/types';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';
import { getCoverUrl } from '@/shared/utils/getCoverUrl';

export function mapCombatOperationListItemDto(dto: CombatOperationListItemDto): CombatOperation {
  const isoDate = (dto.published_at ?? dto.created_at).slice(0, 10);
  const coverUrl = getCoverUrl(dto.image_url);
  // ?v= сбрасывает кеш браузера после смены обложки (ETag бэка привязан к changed_at)
  const imageUrl = coverUrl ? `${coverUrl}?v=${encodeURIComponent(dto.changed_at)}` : coverUrl;

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
