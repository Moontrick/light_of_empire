import { Skeleton } from 'antd';
import styles from './FooterColumnSkeleton.module.scss';

export function FooterColumnSkeleton() {
  return (
    <div className={styles.column} aria-hidden>
      <Skeleton active title={{ width: 96 }} paragraph={{ rows: 4, width: [140, 120, 150, 110] }} />
    </div>
  );
}
