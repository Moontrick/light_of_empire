import { Skeleton } from 'antd';
import styles from './DocSkeleton.module.scss';

export function DocSkeleton() {
  return (
    <div className={styles.root}>
      <Skeleton active paragraph={{ rows: 2 }} title />
      <Skeleton active paragraph={{ rows: 6 }} title={false} />
      <Skeleton active paragraph={{ rows: 6 }} title={false} />
    </div>
  );
}
