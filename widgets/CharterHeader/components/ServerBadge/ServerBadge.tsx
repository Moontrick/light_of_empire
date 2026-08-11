'use client';

import classNames from 'classnames';
import { Skeleton } from 'antd';
import { useServerBadge } from './hooks/useServerBadge';
import styles from './ServerBadge.module.scss';

export function ServerBadge() {
  const { isFirstLoad, isOnline, players, maxPlayers } = useServerBadge();

  if (isFirstLoad) {
    return (
      <div className={styles.badge}>
        <Skeleton.Button active size="small" shape="round" style={{ width: 64, height: 20 }} />
      </div>
    );
  }

  return (
    <div
      className={classNames(styles.badge, { [styles.online]: isOnline })}
      title={isOnline ? 'Сервер онлайн' : 'Сервер недоступен'}
    >
      <span className={styles.dot} aria-hidden />
      <span className={styles.count}>
        {players}
        <span className={styles.max}>/{maxPlayers}</span>
      </span>
    </div>
  );
}
