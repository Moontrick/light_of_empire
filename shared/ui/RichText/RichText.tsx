import { Fragment, type ReactNode } from 'react';
import { parseMarkup, type MarkupNode } from '@/shared/utils/charterMarkup';
import type { RichTextProps } from './types';
import styles from './RichText.module.scss';

function renderNodes(nodes: MarkupNode[]): ReactNode {
  return nodes.map((node, index) => {
    switch (node.type) {
    case 'text':
      return <Fragment key={index}>{node.text}</Fragment>;
    case 'break':
      return <br key={index} />;
    case 'bold':
      return <strong key={index}>{renderNodes(node.children)}</strong>;
    case 'italic':
      return <em key={index}>{renderNodes(node.children)}</em>;
    case 'underline':
      return (
        <span key={index} className={styles.underline}>
          {renderNodes(node.children)}
        </span>
      );
    case 'color':
      return (
        <span key={index} className={styles[node.color]}>
          {renderNodes(node.children)}
        </span>
      );
    default:
      return null;
    }
  });
}

export function RichText({ text }: RichTextProps) {
  return <>{renderNodes(parseMarkup(text))}</>;
}
