import { getTranslations } from 'next-intl/server';
import { russoOne, manrope } from '@utils/fonts';
import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import styles from './not-found.module.scss';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <main className={`${russoOne.variable} ${manrope.variable} ${styles.root}`}>
      <div className={styles.overlay} />

      <div className={styles.panel}>
        <HudCorners />

        <span className={styles.eyebrow}>Light of Empire</span>
        <h1 className={styles.code}>404</h1>
        <p className={styles.tagline}>{t('tagline')}</p>
        <h2 className={styles.heading}>{t('heading')}</h2>
        <p className={styles.sub}>{t('subTitle')}</p>

        <Link href="/" className={styles.button}>
          <span>{t('homeButton')}</span>
          <span className={styles.arrow} aria-hidden>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </Link>
      </div>
    </main>
  );
}
