import type { MarkupColor } from './types';

export const MARKS = {
  bold: ['**', '**'],
  italic: ['*', '*'],
  underline: ['__', '__'],
} as const satisfies Record<string, readonly [string, string]>;

export function colorMarkers(color: MarkupColor): [string, string] {
  return [`[${color}]`, `[/${color}]`];
}

export interface WrapResult {
  text: string;
  selectionStart: number;
  selectionEnd: number;
}

// Выделение уже обёрнуто этими маркерами — снимаем, иначе оборачиваем
export function toggleWrap(
  text: string,
  start: number,
  end: number,
  open: string,
  close: string,
): WrapResult {
  const before = text.slice(0, start);
  const selected = text.slice(start, end);
  const after = text.slice(end);

  if (before.endsWith(open) && after.startsWith(close)) {
    return {
      text: before.slice(0, -open.length) + selected + after.slice(close.length),
      selectionStart: start - open.length,
      selectionEnd: end - open.length,
    };
  }

  if (selected.startsWith(open) && selected.endsWith(close) && selected.length >= open.length + close.length) {
    const inner = selected.slice(open.length, -close.length);
    return {
      text: before + inner + after,
      selectionStart: start,
      selectionEnd: start + inner.length,
    };
  }

  return {
    text: before + open + selected + close + after,
    selectionStart: start + open.length,
    selectionEnd: end + open.length,
  };
}
