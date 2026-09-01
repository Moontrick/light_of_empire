import { RichText } from '@/shared/ui/RichText';
import type { DocFooterProps } from './types';
import styles from './DocFooter.module.scss';

export function DocFooter({ text }: DocFooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        <RichText text={text} />
      </p>
    </footer>
  );
}
