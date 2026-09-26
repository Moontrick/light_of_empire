import { Skeleton } from 'antd';
import styles from './CtaCardSkeleton.module.scss';

export function CtaCardSkeleton() {
  return (
    <article className={styles.card} aria-hidden>
      <div className={styles.bar}>
        <Skeleton active title={{ width: '55%' }} paragraph={false} />
      </div>
      <div className={styles.media} />
      <div className={styles.body}>
        <Skeleton active title={false} paragraph={{ rows: 3 }} />
        <Skeleton.Button active className={styles.action} />
      </div>
    </article>
  );
}
