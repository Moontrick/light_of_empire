import type { PageTreeNodeDto } from '@/shared/api/pages';
import type { NavNode } from '../types';
import { flattenToHeight } from './buildCompactNav';

// NavItem поддерживает стилями только depth0–2 — более глубокие узлы поднимаем выше
const MAX_SUBTREE_HEIGHT = 2;

function mapNode(node: PageTreeNodeDto): NavNode | null {
  if (node.status !== 'PUBLISHED') return null;

  const children = node.children
    .map(mapNode)
    .filter((child): child is NavNode => child !== null);

  // Родитель с видимыми детьми — контейнер: раскрывает список, сам никуда не ведёт
  if (children.length > 0) return { label: node.name, children };

  // Лист либо контейнер, у которого не осталось видимых детей (например, все
  // дочерние страницы черновики) — в обоих случаях отдаём ссылку на саму
  // страницу вместо того, чтобы выбрасывать узел: админ должен видеть узел,
  // просто без раскрывающегося списка
  return { label: node.name, href: `/${node.slug}` };
}

export function buildPagesNav(tree: PageTreeNodeDto[]): NavNode[] {
  const nodes = tree.map(mapNode).filter((node): node is NavNode => node !== null);
  return flattenToHeight(nodes, MAX_SUBTREE_HEIGHT);
}
