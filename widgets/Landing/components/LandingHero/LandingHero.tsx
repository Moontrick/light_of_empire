'use client';

import { useState } from 'react';
import { Link } from '@/shared/i18n/navigation';
import { DISCORD_URL, HERO_SLIDES } from '../../data';
import { ImperialEmblem } from '../ImperialEmblem';
import styles from './LandingHero.module.scss';

export function LandingHero() {
  const [active, setActive] = useState(0);
  const count = HERO_SLIDES.length;
  const slide = HERO_SLIDES[active];
  const go = (next: number) => setActive((next + count) % count);

  return (
    <section className={styles.hero}>
      <div
        key={slide.id}
        className={styles.bg}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className={styles.overlay} />

      <div className={styles.frame}>
        <span className={styles.squareTL} aria-hidden />
        <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden />
        <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden />
        <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden />

        <div className={styles.leftRail} aria-hidden>
          <ImperialEmblem className={styles.railEmblem} />
          <span className={styles.railText}>LIGHT OF EMPIRE</span>
        </div>

        <div className={styles.rightRail} aria-hidden>
          <span className={styles.crosshair}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
          <span className={styles.dottedLine} />
          <span className={styles.tick} />
        </div>

        <div key={slide.id} className={styles.content}>
          <span className={styles.eyebrow}>{slide.eyebrow}</span>
          <h1 className={styles.title}>{slide.title}</h1>
          <span className={styles.subtitle}>{slide.subtitle}</span>
          <p className={styles.desc}>
            <span className={styles.descMark} aria-hidden />
            <span>{slide.description}</span>
          </p>
          <div className={styles.actions}>
            <Link href={slide.ctaHref} className={styles.cta}>
              <span>{slide.ctaLabel}</span>
              <span className={styles.ctaIcon} aria-hidden>
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
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className={styles.ghost}>
              Discord
            </a>
          </div>
        </div>

        <div className={styles.slider}>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(active - 1)}
            aria-label="Предыдущий"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div className={styles.dots}>
            {HERO_SLIDES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={i === active ? styles.dotActive : styles.dot}
                onClick={() => setActive(i)}
                aria-label={item.title}
                aria-current={i === active}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.arrow}
            onClick={() => go(active + 1)}
            aria-label="Следующий"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div key={`loc-${slide.id}`} className={styles.location}>
          <span className={styles.locName}>{slide.location.name}</span>
          <span className={styles.locSub}>{slide.location.sub}</span>
        </div>
      </div>
    </section>
  );
}
