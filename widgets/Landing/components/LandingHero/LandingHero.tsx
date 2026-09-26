'use client';

import { Link } from '@/shared/i18n/navigation';
import { IconDiscord } from '@/public/icons/IconDiscord';
import { SITE_TITLE } from '@/shared/constants';
import { DISCORD_URL } from '../../data';
import { HeroSwitcher } from './components/HeroSwitcher';
import { useHeroSlides } from './hooks/useHeroSlides';
import {
  HERO_DISCORD_SUB,
  HERO_PRIMARY_SUB,
  HERO_SWITCHER_LABEL,
  HERO_LOCATION_LABEL,
} from './constants';
import styles from './LandingHero.module.scss';

export function LandingHero() {
  const { slides, active, slide, select } = useHeroSlides();

  return (
    <section className={styles.hero}>
      <div
        key={slide.id}
        className={styles.bg}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className={styles.fog} />

      <div className={styles.inner}>
        <div key={slide.id} className={styles.content}>
          <span className={styles.crumbs}>
            <span className={styles.crumbRoot}>{SITE_TITLE}</span>
            <span className={styles.crumbSep}>/</span>
            <span>{slide.eyebrow}</span>
          </span>
          <h1 className={styles.title}>{slide.title}</h1>
          <span className={styles.subtitle}>{slide.subtitle}</span>
          <p className={styles.desc}>{slide.description}</p>

          <div className={styles.actions}>
            <Link href={slide.ctaHref} className={styles.tilePrimary}>
              <span className={styles.tileTitle}>{slide.ctaLabel}</span>
              <span className={styles.tileSub}>{HERO_PRIMARY_SUB}</span>
            </Link>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={styles.tile}>
              <span className={styles.tileTitle}>
                <IconDiscord width={18} height={18} />
                Discord
              </span>
              <span className={styles.tileSub}>{HERO_DISCORD_SUB}</span>
            </a>
          </div>
        </div>

        <aside key={`loc-${slide.id}`} className={styles.location}>
          <span className={styles.locationHead}>{HERO_LOCATION_LABEL}</span>
          <span className={styles.locName}>{slide.location.name}</span>
          <span className={styles.locSub}>{slide.location.sub}</span>
        </aside>
      </div>

      <div className={styles.bottom}>
        <span className={styles.switchLabel}>{HERO_SWITCHER_LABEL}</span>
        <HeroSwitcher slides={slides} active={active} onSelect={select} />
      </div>
    </section>
  );
}
