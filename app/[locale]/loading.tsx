import { ContentSkeleton } from '@ui/ContentSkeleton';
import styles from './loading.module.scss';

export default function GlobalLoading() {
  return (
    <div className={styles.root}>
      <ContentSkeleton />
    </div>
  );
}
