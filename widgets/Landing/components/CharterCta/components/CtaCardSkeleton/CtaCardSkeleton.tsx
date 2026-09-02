import { Skeleton } from 'antd';
import { HudCorners } from '@ui/HudCorners';
import styles from './CtaCardSkeleton.module.scss';

export function CtaCardSkeleton() {
  return (
    <article className={styles.card} aria-hidden>
      <HudCorners />
      <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 3 }} />
      <Skeleton.Button active className={styles.action} />
    </article>
  );
}
