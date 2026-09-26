import { Link } from '@/shared/i18n/navigation';
import type { SectionHeadProps } from './types';
import styles from './SectionHead.module.scss';

// Заголовок секции в духе «COLLECT / UNLOCKS»: жирный корень, слэш, название
export function SectionHead({ eyebrow, title, text, link }: SectionHeadProps) {
  return (
    <div className={styles.head}>
      <div className={styles.main}>
        <span className={styles.crumbs}>
          <span className={styles.crumbRoot}>{eyebrow}</span>
          <span className={styles.crumbSep}>/</span>
          <span>{title}</span>
        </span>
        {text && <p className={styles.text}>{text}</p>}
      </div>

      {link && (
        <Link href={link.href} className={styles.link}>
          {link.label}
          <span className={styles.arrow} aria-hidden>
            →
          </span>
        </Link>
      )}
    </div>
  );
}
