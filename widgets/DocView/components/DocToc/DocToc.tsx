import { useTranslations } from 'next-intl';
import { HudCorners } from '@ui/HudCorners';
import type { DocTocProps } from './types';
import styles from './DocToc.module.scss';

export function DocToc({ sections }: DocTocProps) {
  const t = useTranslations('charter');

  return (
    <nav className={styles.toc} aria-label={t('toc')}>
      <HudCorners />
      {/* <h2 className={styles.title}>{t('toc')}</h2> */}
      <ol className={styles.grid}>
        {sections.map((section) => (
          <li key={section.slug} className={styles.item}>
            <a className={styles.link} href={'#' + section.slug}>
              <span className={styles.label}>{section.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
