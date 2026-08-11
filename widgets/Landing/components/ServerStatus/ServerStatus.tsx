'use client';

import classNames from 'classnames';
import { Skeleton } from 'antd';
import { HudCorners } from '@ui/HudCorners';
import { useServerStatusView } from './hooks/useServerStatusView';
import {
  STATUS_CONNECT_LABEL,
  STATUS_LABEL_FAILED,
  STATUS_LABEL_OFFLINE,
  STATUS_LABEL_ONLINE,
  STATUS_MAP_PREFIX,
  STATUS_PLAYERS_CAPTION,
} from './constants';
import styles from './ServerStatus.module.scss';

export function ServerStatus() {
  const view = useServerStatusView();

  const statusLabel = view.hasFailed
    ? STATUS_LABEL_FAILED
    : view.isOnline
      ? STATUS_LABEL_ONLINE
      : STATUS_LABEL_OFFLINE;

  return (
    <section className={styles.status}>
      <div className={styles.inner}>
        <HudCorners />

        {view.isFirstLoad ? (
          <Skeleton active title={{ width: '30%' }} paragraph={{ rows: 3, width: ['60%', '80%', '40%'] }} />
        ) : (
          <>
            <div className={styles.info}>
              <div className={styles.head}>
                <span
                  className={classNames(styles.dot, { [styles.dotOnline]: view.isOnline && !view.hasFailed })}
                  aria-hidden
                />
                <span className={styles.label}>{statusLabel}</span>
              </div>

              <span className={styles.name}>{view.serverName}</span>
              {view.map && (
                <span className={styles.map}>
                  {STATUS_MAP_PREFIX} {view.map}
                </span>
              )}
            </div>

            <div className={styles.count}>
              <span className={styles.countValue}>{view.players}</span>
              <span className={styles.countDivider}>/</span>
              <span className={styles.countMax}>{view.maxPlayers}</span>
              <span className={styles.countCaption}>{STATUS_PLAYERS_CAPTION}</span>
            </div>

            <a href={view.connectHref} className={styles.action}>
              <span>{STATUS_CONNECT_LABEL}</span>
              <span className={styles.arrow} aria-hidden>
                →
              </span>
            </a>
          </>
        )}
      </div>
    </section>
  );
}
