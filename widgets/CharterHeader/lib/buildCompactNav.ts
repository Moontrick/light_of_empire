import type { NavNode } from '../types';

// NavItem поддерживает стилями только depth0 → depth1 → depth2 (см. NavItem.module.scss).
// Пункт, вложенный в «Прочее» (depth1), поэтому не должен сам иметь внуков —
// иначе его дети окажутся на depth3, для которого стилей нет.
const MAX_NESTED_HEIGHT = 1;

function subtreeHeight(node: NavNode): number {
  if (!node.children?.length) return 0;

  return 1 + Math.max(...node.children.map(subtreeHeight));
}

// Если у пункта высота поддерева больше допустимой, сам пункт как обёртку не
// сохраняем — поднимаем его детей на уровень выше (рекурсивно, на случай ещё
// более глубокой вложенности), сохраняя порядок.
export function flattenToHeight(nodes: NavNode[], maxHeight: number): NavNode[] {
  return nodes.flatMap((node) => {
    if (subtreeHeight(node) <= maxHeight) return [node];

    return node.children?.length ? flattenToHeight(node.children, maxHeight) : [node];
  });
}

/**
 * Сворачивает пункты верхнего уровня начиная с `visibleCount` в один
 * выпадающий пункт «Прочее», сохраняя порядок и не превышая глубину depth2.
 * Если сворачивать нечего (останется 0 или 1 пункт), возвращает исходный
 * список без изменений.
 */
export function buildCompactNav(
  items: NavNode[],
  visibleCount: number,
  moreLabel: string,
  moreHref: string,
): NavNode[] {
  const collapsible = items.slice(visibleCount);

  if (collapsible.length <= 1) return items;

  const visible = items.slice(0, visibleCount);
  const children = flattenToHeight(collapsible, MAX_NESTED_HEIGHT);

  return [...visible, { label: moreLabel, href: moreHref, children }];
}
