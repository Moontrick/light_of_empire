import Link from 'next/link';
import { isExternalUrl } from '@/shared/utils/linkUrl';
import type { LinkBlockProps } from './types';
import styles from './LinkBlock.module.scss';

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path
        d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.5-1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LinkBlock({ url, text }: LinkBlockProps) {
  const href = url.trim();
  const label = text?.trim() || href;
  const external = isExternalUrl(href);

  const body = (
    <>
      <span className={styles.icon}>
        <LinkIcon />
      </span>
      <span className={styles.body}>
        <span className={styles.label}>{label}</span>
        {label !== href && <span className={styles.url}>{href}</span>}
      </span>
      <span className={styles.arrow} aria-hidden>
        {external ? '↗' : '→'}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
        {body}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.link}>
      {body}
    </Link>
  );
}
