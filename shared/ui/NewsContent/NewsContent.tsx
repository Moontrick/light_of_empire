import { LinkBlock } from '@ui/LinkBlock';
import { RichText } from '@ui/RichText';
import { resolveImageSrc } from '@/shared/utils/resolveImageSrc';
import type { NewsContentProps } from './types';
import styles from './NewsContent.module.scss';

export function NewsContent({ blocks }: NewsContentProps) {
  return (
    <div className={styles.content}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'heading') {
          return (
            <h2 key={key} className={styles.heading}>
              <RichText text={block.text} />
            </h2>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={key} className={styles.quote}>
              <p>
                <RichText text={block.text} />
              </p>
              {block.author && <cite>{block.author}</cite>}
            </blockquote>
          );
        }

        if (block.type === 'member') {
          return (
            <p key={key} className={styles.member}>
              <span className={styles.memberName}>{block.name}</span> —{' '}
              <span className={styles.memberRole}>{block.role}</span>
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <div key={key} className={styles.listBlock}>
              {block.title && (
                <p className={styles.listTitle}>
                  <RichText text={block.title} />
                </p>
              )}
              <ul className={styles.list}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={styles.listItem}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (block.type === 'image') {
          return (
            <figure key={key} className={styles.imageBlock}>
              <img src={resolveImageSrc(block.src) ?? undefined} alt={block.alt ?? ''} className={styles.image} />
              {block.caption && <figcaption className={styles.caption}>{block.caption}</figcaption>}
            </figure>
          );
        }

        if (block.type === 'link') {
          if (!block.url.trim()) return null;
          return (
            <div key={key} className={styles.linkBlock}>
              <LinkBlock url={block.url} text={block.text} />
            </div>
          );
        }

        return (
          <p key={key} className={styles.paragraph}>
            <RichText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
