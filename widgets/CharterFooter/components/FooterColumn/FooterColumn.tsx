import { Link } from '@/shared/i18n/navigation';
import type { FooterColumnProps } from '../../types';
import styles from './FooterColumn.module.scss';

export function FooterColumn({ column }: FooterColumnProps) {
  return (
    <div className={styles.column}>
      <span className={styles.title}>{column.title}</span>
      <ul className={styles.list}>
        {column.links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={styles.link}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
