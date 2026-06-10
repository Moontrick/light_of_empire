import classNames from 'classnames';
import { russoOne, manrope } from '@utils/fonts';
import { Link } from '@/shared/i18n/navigation';
import { HudCorners } from '@ui/HudCorners';
import { IconDiscord } from '@/public/icons/IconDiscord';
import { FooterColumn } from './components/FooterColumn';
import {
  FOOTER_COLUMNS,
  FOOTER_COPYRIGHT,
  FOOTER_NOTE,
  FOOTER_SOCIALS,
  FOOTER_TAGLINE,
  FOOTER_TITLE,
} from './constants';
import styles from './CharterFooter.module.scss';

export function CharterFooter() {
  return (
    <footer className={classNames(styles.footer, russoOne.variable, manrope.variable)}>
      <div className={styles.inner}>
        <HudCorners />

        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              {FOOTER_TITLE}
            </Link>
            <p className={styles.tagline}>{FOOTER_TAGLINE}</p>

            <div className={styles.socials}>
              {FOOTER_SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={styles.social}
                >
                  <IconDiscord width={18} height={18} />
                </a>
              ))}
            </div>
          </div>

          <nav className={styles.columns}>
            {FOOTER_COLUMNS.map((column) => (
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
