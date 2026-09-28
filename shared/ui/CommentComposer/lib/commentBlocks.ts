import type { CharterBlock } from '@/shared/types';

export interface CommentParts {
  text: string;
  // src картинок в порядке блоков
  images: string[];
}

// Комментарий хранится теми же блоками, что тема; композер знает только text и image.
// Другие виды (если появятся через API) при правке потеряются — это осознанно
export function splitCommentBlocks(blocks: CharterBlock[]): CommentParts {
  const text = blocks
    .filter((block): block is Extract<CharterBlock, { kind: 'text' }> => block.kind === 'text')
    .map((block) => block.text)
    .join('\n\n');
  const images = blocks
    .filter((block): block is Extract<CharterBlock, { kind: 'image' }> => block.kind === 'image')
    .map((block) => block.src);
  return { text, images };
}

export function buildCommentBlocks(text: string, images: string[]): CharterBlock[] {
  return [
    ...(text.length > 0 ? [{ kind: 'text' as const, text }] : []),
    ...images.map((src) => ({ kind: 'image' as const, src })),
  ];
}
