import { HudCorners } from '@ui/HudCorners';
import type { HudCardProps } from './types';
import styles from './HudCard.module.scss';

export function HudCard({ title, extra, children }: HudCardProps) {
  return (
    <section className={styles.card}>
      <HudCorners />
      {(title || extra) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {extra}
        </div>
      )}
      {children}
    </section>
  );
}
