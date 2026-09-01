import type { CSSProperties } from 'react';

// styles справочника — свободная строка с бэка; применяем только известные
// текстовые свойства, всё остальное молча отбрасываем
const ALLOWED_PROPERTIES: Record<string, keyof CSSProperties> = {
  'font-weight': 'fontWeight',
  'font-style': 'fontStyle',
  'font-variant': 'fontVariant',
  'letter-spacing': 'letterSpacing',
  'text-transform': 'textTransform',
  'text-shadow': 'textShadow',
  'text-decoration': 'textDecoration',
};

export function parseInlineStyles(styles: string | null | undefined): CSSProperties {
  if (!styles) return {};

  const result: Record<string, string> = {};
  for (const declaration of styles.split(';')) {
    const colonIndex = declaration.indexOf(':');
    if (colonIndex === -1) continue;

    const property = declaration.slice(0, colonIndex).trim().toLowerCase();
    const value = declaration.slice(colonIndex + 1).trim();
    const key = ALLOWED_PROPERTIES[property];
    if (key && value) result[key] = value;
  }

  return result as CSSProperties;
}
