import { getNewsCoverUrl } from '@/shared/api/news';
import type { NewsDetailDto, NewsListItemDto } from '@/shared/api/news';
import type { NewsPost, NewsPostDetail } from '@/shared/types';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';

export function mapNewsListItemDto(dto: NewsListItemDto): NewsPost {
  const isoDate = (dto.published_at ?? dto.created_at).slice(0, 10);
  const coverUrl = getNewsCoverUrl(dto.image_url);
  const imageUrl = coverUrl ? `${coverUrl}?v=${encodeURIComponent(dto.changed_at)}` : coverUrl;

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
  };
}

export function mapNewsDetailDto(dto: NewsDetailDto): NewsPostDetail {
  return {
    ...mapNewsListItemDto(dto),
    lead: dto.lead,
    body: dto.body,
  };
}
