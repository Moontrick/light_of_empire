import { Button } from 'antd';
import type { CharterEmptyStateProps } from './types';
import styles from './CharterEmptyState.module.scss';

export function CharterEmptyState({ canEdit, onCreate }: CharterEmptyStateProps) {
  return (
    <div className={styles.root}>
      <p className={styles.title}>Устав готовится</p>
      <p className={styles.text}>Документ ещё не опубликован. Загляните позже.</p>
      {canEdit && <Button onClick={onCreate}>Создать устав</Button>}
    </div>
  );
}
