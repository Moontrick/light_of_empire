import { parseMarkup } from './parseMarkup';
import type { MarkupNode } from './types';

function flatten(nodes: MarkupNode[]): string {
  return nodes
    .map((node) => {
      switch (node.type) {
      case 'text':
        return node.text;
      case 'break':
        return ' ';
      default:
        return flatten(node.children);
      }
    })
    .join('');
}

// Для анонсов в карточках: бэк режет small_body из блоков вместе с маркерами разметки
export function stripMarkup(text: string): string {
  return flatten(parseMarkup(text)).replace(/\s+/g, ' ').trim();
}
