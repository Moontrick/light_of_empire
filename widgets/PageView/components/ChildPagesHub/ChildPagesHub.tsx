import { HubCard, HubCardSkeleton } from '@widgets/Hub';
import type { ChildPagesHubProps } from './types';
import styles from './ChildPagesHub.module.scss';

export function ChildPagesHub({ items }: ChildPagesHubProps) {
  return (
    <section className={styles.hub}>
      <div className={styles.grid}>
        {items.map((item) =>
          item.loading ? (
            <HubCardSkeleton key={item.slug} />
          ) : (
            <HubCard
              key={item.slug}
              card={{ title: item.title, description: item.description, href: `/${item.slug}` }}
            />
          ),
        )}
      </div>
    </section>
  );
}
