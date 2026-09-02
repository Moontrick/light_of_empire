import type { PageTreeNodeDto } from '@/shared/api/pages';

export function publishedNodes(nodes: PageTreeNodeDto[]): PageTreeNodeDto[] {
  return nodes.filter((node) => node.status === 'PUBLISHED');
}
