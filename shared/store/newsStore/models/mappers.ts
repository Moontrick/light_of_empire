import { getCoverUrl } from '@/shared/utils/getCoverUrl';
import type { NewsDetailDto, NewsListItemDto } from '@/shared/api/news';
import type { NewsPost, NewsPostDetail } from '@/shared/types';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';

export function mapNewsListItemDto(dto: NewsListItemDto): NewsPost {
  const isoDate = (dto.published_at ?? dto.created_at).slice(0, 10);
  // URL image-service immutable: смена обложки меняет сам URL, cache-busting не нужен
  const imageUrl = getCoverUrl(dto.image_url);

  return {
    id: dto.id,
    slug: dto.slug,
    title: dto.title,
    tag: dto.tag,
    excerpt: dto.excerpt,
    smallBody: dto.small_body,
    imageUrl,
    readingTime: `${dto.reading_minutes} мин`,
    status: dto.status,
    isoDate,
    date: formatNewsDate(isoDate),
    publishedAt: dto.published_at,
    createdAt: dto.created_at,
    changedAt: dto.changed_at,
    isSendToDiscord: dto.is_send_to_discord ?? false,
  };
}

export function mapNewsDetailDto(dto: NewsDetailDto): NewsPostDetail {
  return {
    ...mapNewsListItemDto(dto),
    lead: dto.lead,
    body: dto.body,
  };
}
