'use client';

import classNames from 'classnames';
import type { HeroSwitcherProps } from './types';
import styles from './HeroSwitcher.module.scss';

// Сегментный переключатель как «DIFFICULTY: NORMAL | HARD | MASTER» в Battlefront
export function HeroSwitcher({ slides, active, onSelect }: HeroSwitcherProps) {
  return (
    <div className={styles.switcher} role="tablist" aria-label="Разделы">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          role="tab"
          aria-selected={index === active}
          className={classNames(styles.segment, {
            [styles.segmentActive]: index === active,
          })}
          onClick={() => onSelect(index)}
        >
          {slide.menuLabel}
        </button>
      ))}
    </div>
  );
}
