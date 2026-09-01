export type MarkupColor = 'accent' | 'danger' | 'info' | 'muted' | 'strong';

export const MARKUP_COLORS: MarkupColor[] = ['accent', 'danger', 'info', 'muted', 'strong'];

export type MarkupNode =
  | { type: 'text'; text: string }
  | { type: 'break' }
  | { type: 'bold' | 'italic' | 'underline'; children: MarkupNode[] }
  | { type: 'color'; color: MarkupColor; children: MarkupNode[] };
