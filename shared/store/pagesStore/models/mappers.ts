import type { PageDto, PageSectionDto } from '@/shared/api/pages';
import type { DocSectionData } from '@/shared/types';
import type { PageDocument } from '../types';

export function mapPageSectionDto(dto: PageSectionDto): DocSectionData {
  return { id: dto.id, slug: dto.slug, title: dto.title, blocks: dto.blocks };
}

// sections передаются явно, когда ответ бэка их не содержит (POST/PUT)
export function mapPageDto(dto: PageDto, sections?: DocSectionData[]): PageDocument {
  return {
    id: dto.id,
    slug: dto.slug,
    name: dto.name,
    status: dto.status,
    hero: { eyebrow: dto.hero_eyebrow, title: dto.hero_title, intro: dto.hero_intro },
    footer: dto.footer,
    searchPlaceholder: dto.search_placeholder ?? undefined,
    sections: sections ?? (dto.sections ?? []).map(mapPageSectionDto),
  };
}
