import { useTranslations } from 'next-intl';
import { HudCorners } from '@ui/HudCorners';
import type { CharterTocProps } from './types';
import styles from './CharterToc.module.scss';

export function CharterToc({ sections }: CharterTocProps) {
  const t = useTranslations('charter');

  return (
    <nav className={styles.toc} aria-label={t('toc')}>
      <HudCorners />
      {/* <h2 className={styles.title}>{t('toc')}</h2> */}
      <ol className={styles.grid}>
        {sections.map((section) => (
          <li key={section.id} className={styles.item}>
            <a className={styles.link} href={`#${section.id}`}>
              <span className={styles.label}>{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
