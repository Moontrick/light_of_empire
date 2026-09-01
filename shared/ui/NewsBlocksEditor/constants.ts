import type { NewsBlock } from '@/shared/types';

export const NEWS_BLOCK_KINDS = [
  'paragraph', 'heading', 'quote', 'member', 'list', 'image',
] as const;

export type NewsBlockKind = (typeof NEWS_BLOCK_KINDS)[number];

export const NEWS_BLOCK_LABELS: Record<NewsBlockKind, string> = {
  paragraph: 'Абзац',
  heading: 'Подзаголовок',
  quote: 'Цитата',
  member: 'Персона',
  list: 'Список',
  image: 'Картинка',
};

export function createEmptyNewsBlock(kind: NewsBlockKind): NewsBlock {
  switch (kind) {
  case 'heading':
    return { type: 'heading', text: '' };
  case 'quote':
    return { type: 'quote', text: '' };
  case 'member':
    return { type: 'member', name: '', role: '' };
  case 'list':
    return { type: 'list', items: [''] };
  case 'image':
    return { type: 'image', src: '' };
  default:
    return { type: 'paragraph', text: '' };
  }
}
