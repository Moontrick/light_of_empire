import type { ImperialEmblemProps } from './types';
import styles from './ImperialEmblem.module.scss';

export function ImperialEmblem({ className }: ImperialEmblemProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={[styles.svg, className].filter(Boolean).join(' ')}
      aria-hidden
    >
      <circle cx="60" cy="60" r="56" className={styles.ring} />
      <circle cx="60" cy="60" r="50" className={styles.ticks} />
      <circle cx="60" cy="60" r="34" className={styles.ring} />
      <g className={styles.spokes}>
        <line x1="60" y1="12" x2="60" y2="108" />
        <line x1="12" y1="60" x2="108" y2="60" />
        <line x1="26" y1="26" x2="94" y2="94" />
        <line x1="94" y1="26" x2="26" y2="94" />
      </g>
      <circle cx="60" cy="60" r="8" className={styles.hub} />
    </svg>
  );
}
