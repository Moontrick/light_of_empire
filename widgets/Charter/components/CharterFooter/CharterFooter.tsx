import type { CharterFooterProps } from './types';
import styles from './CharterFooter.module.scss';

export function CharterFooter({ text }: CharterFooterProps) {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>{text}</p>
    </footer>
  );
}
