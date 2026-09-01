import { MARKUP_COLORS } from './types';
import type { MarkupColor, MarkupNode } from './types';

interface Delimiter {
  open: string;
  close: string;
  make: (children: MarkupNode[]) => MarkupNode;
}

// Порядок важен: '**' должен проверяться раньше '*'
const DELIMITERS: Delimiter[] = [
  { open: '**', close: '**', make: (children) => ({ type: 'bold', children }) },
  { open: '__', close: '__', make: (children) => ({ type: 'underline', children }) },
  { open: '*', close: '*', make: (children) => ({ type: 'italic', children }) },
  ...MARKUP_COLORS.map(
    (color: MarkupColor): Delimiter => ({
      open: `[${color}]`,
      close: `[/${color}]`,
      make: (children) => ({ type: 'color', color, children }),
    }),
  ),
];

interface Match {
  index: number;
  delimiter: Delimiter | null; // null — перенос строки
}

function findEarliest(rest: string): Match | null {
  let best: Match | null = null;

  const breakIndex = rest.indexOf('\n');
  if (breakIndex !== -1) {
    best = { index: breakIndex, delimiter: null };
  }

  for (const delimiter of DELIMITERS) {
    // Непарное, пустое или пробельное вхождение — не разметка,
    // но оно не отменяет более поздние валидные вхождения того же маркера
    let index = rest.indexOf(delimiter.open);
    while (index !== -1 && (best === null || index < best.index)) {
      const closeIndex = rest.indexOf(delimiter.close, index + delimiter.open.length);
      if (closeIndex === -1) break;
      const inner = rest.slice(index + delimiter.open.length, closeIndex);
      if (inner.trim().length > 0) {
        best = { index, delimiter };
        break;
      }
      index = rest.indexOf(delimiter.open, index + 1);
    }
  }

  return best;
}

export function parseMarkup(text: string): MarkupNode[] {
  const nodes: MarkupNode[] = [];
  let rest = text;

  const pushText = (value: string) => {
    if (!value) return;
    const last = nodes[nodes.length - 1];
    if (last && last.type === 'text') {
      last.text += value;
    } else {
      nodes.push({ type: 'text', text: value });
    }
  };

  while (rest.length > 0) {
    const match = findEarliest(rest);
    if (!match) {
      pushText(rest);
      break;
    }

    pushText(rest.slice(0, match.index));

    if (!match.delimiter) {
      nodes.push({ type: 'break' });
      rest = rest.slice(match.index + 1);
      continue;
    }

    const { open, close, make } = match.delimiter;
    const innerStart = match.index + open.length;
    const closeIndex = rest.indexOf(close, innerStart);
    nodes.push(make(parseMarkup(rest.slice(innerStart, closeIndex))));
    rest = rest.slice(closeIndex + close.length);
  }

  return nodes;
}
