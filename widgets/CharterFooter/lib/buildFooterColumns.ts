import type { PageTreeNodeDto } from '@/shared/api/pages';
import { publishedNodes } from '@/shared/utils/pagesTree';
import { FOOTER_COMMUNITY_COLUMN, FOOTER_MAIN_COLUMN } from '../constants';
import type { FooterColumnData, FooterLink } from '../types';

const toLink = (node: PageTreeNodeDto): FooterLink => ({ label: node.name, href: `/${node.slug}` });

// Узлы верхнего уровня с детьми — отдельные колонки, листы верхнего уровня — в «Основное»
export function buildFooterColumns(tree: PageTreeNodeDto[]): FooterColumnData[] {
  const roots = publishedNodes(tree).map((node) => ({ node, children: publishedNodes(node.children) }));

  const leaves = roots.filter(({ children }) => children.length === 0).map(({ node }) => toLink(node));
  const sections = roots
    .filter(({ children }) => children.length > 0)
    .map(({ node, children }) => ({ title: node.name, links: children.map(toLink) }));

  return [
    { ...FOOTER_MAIN_COLUMN, links: [...FOOTER_MAIN_COLUMN.links, ...leaves] },
    ...sections,
    FOOTER_COMMUNITY_COLUMN,
  ];
}
