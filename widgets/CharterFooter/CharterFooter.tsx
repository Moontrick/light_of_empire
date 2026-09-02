'use client';

import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import { FooterColumn } from './components/FooterColumn';
import { FooterColumnSkeleton } from './components/FooterColumnSkeleton';
import { useCharterFooter } from './hooks/useCharterFooter';
import {
  CONNECT_URL,
  CONNECT_URL_IP,
  FOOTER_COPYRIGHT,
  FOOTER_NOTE,
  FOOTER_SOCIALS,
  FOOTER_TITLE,
  SERVER_ADDRESS,
  SERVER_ADDRESS_IP,
} from './constants';
import styles from './CharterFooter.module.scss';

export function CharterFooter() {
  const { columns, loading } = useCharterFooter();
  const [mainColumn, ...restColumns] = columns;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <HudCorners />

        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              {FOOTER_TITLE}
            </Link>

            <div className={styles.socials}>
              {FOOTER_SOCIALS.map(({ label, href, icon: Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  aria-label={label}
                  title={label}
                  className={styles.social}
                >
                  <Icon className={styles.socialIcon} />
                </a>
              ))}
            </div>

            <a href={CONNECT_URL} className={styles.connect}>
              connect {SERVER_ADDRESS}
            </a>
            <a href={CONNECT_URL_IP} className={styles.connect}>
              connect {SERVER_ADDRESS_IP}
            </a>
          </div>

          <nav className={styles.columns}>
            <FooterColumn column={mainColumn} />
            {loading && (
              <>
                <FooterColumnSkeleton />
                <FooterColumnSkeleton />
              </>
            )}
            {restColumns.map((column) => (
              <FooterColumn key={column.title} column={column} />
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>{FOOTER_COPYRIGHT}</span>
          <span className={styles.note}>{FOOTER_NOTE}</span>
        </div>
      </div>
    </footer>
  );
}
