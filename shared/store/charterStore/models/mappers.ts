import type { CharterDto, CharterSectionDto, CharterWrapperDto } from '@/shared/api/charter';
import type { CharterDocSection, CharterDocument } from '../types';

export function mapSectionDto(dto: CharterSectionDto): CharterDocSection {
  return { id: dto.id, slug: dto.slug, title: dto.title, blocks: dto.blocks };
}

export function mapWrapperDto(
  dto: CharterWrapperDto,
  sections: CharterDocSection[],
): CharterDocument {
  return {
    hero: { eyebrow: dto.hero_eyebrow, title: dto.hero_title, intro: dto.hero_intro },
    footer: dto.footer,
    searchPlaceholder: dto.search_placeholder ?? undefined,
    sections,
  };
}

export function mapCharterDto(dto: CharterDto): CharterDocument {
  return mapWrapperDto(dto, dto.sections.map(mapSectionDto));
}
