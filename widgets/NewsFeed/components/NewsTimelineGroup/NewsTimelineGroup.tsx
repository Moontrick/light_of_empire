import { NewsFeatured } from '../NewsFeatured';
import { NewsRow } from '../NewsRow';
import type { NewsTimelineGroupProps } from './types';
import styles from './NewsTimelineGroup.module.scss';

export function NewsTimelineGroup({ group }: NewsTimelineGroupProps) {
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
            <NewsFeatured key={item.slug} item={item} />
          ) : (
            <NewsRow key={item.slug} item={item} index={index + 1} />
          );
        })}
      </div>
    </section>
  );
}
