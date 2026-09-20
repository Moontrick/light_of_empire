import { CombatOperationFeatured } from '../CombatOperationFeatured';
import { CombatOperationRow } from '../CombatOperationRow';
import type { CombatOperationTimelineGroupProps } from './types';
import styles from './CombatOperationTimelineGroup.module.scss';

export function CombatOperationTimelineGroup({ group }: CombatOperationTimelineGroupProps) {
  return (
    <section className={styles.group}>
      <div className={styles.marker}>
        <span className={styles.markerDot} aria-hidden />
        <time dateTime={group.isoDate} className={styles.date}>
          {group.label}
        </time>
      </div>

      <div className={styles.items}>
        {group.items.map((item, offset) => {
          const index = group.startIndex + offset;

          return index % 3 === 0 ? (
            <CombatOperationFeatured key={item.slug} item={item} />
          ) : (
            <CombatOperationRow key={item.slug} item={item} index={index + 1} />
          );
        })}
      </div>
    </section>
  );
}
