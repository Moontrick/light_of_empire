import { Skeleton } from 'antd';
import { HudCorners } from '@ui/HudCorners';
import styles from './HubCardSkeleton.module.scss';

export function HubCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden>
      <HudCorners />
      <Skeleton active title={{ width: '70%' }} paragraph={{ rows: 2 }} />
    </div>
  );
}
