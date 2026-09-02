import type { PageTreeNodeDto } from '@/shared/api/pages';

export function findTreeNode(tree: PageTreeNodeDto[], slug: string): PageTreeNodeDto | null {
  for (const node of tree) {
    if (node.slug === slug) return node;
    const found = findTreeNode(node.children, slug);
    if (found) return found;
  }
  return null;
}
