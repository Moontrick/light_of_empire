'use client';

import classNames from 'classnames';
import { Skeleton } from 'antd';
import { HudCorners } from '@ui/HudCorners';
import { useServerStatusView } from './hooks/useServerStatusView';
import { ServerPreview } from './components/ServerPreview';
import { ServerMeter } from './components/ServerMeter';
import { ServerAddress } from './components/ServerAddress';
import { ServerRoster } from './components/ServerRoster';
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

        <ServerPreview />

        <div className={styles.panel}>
          {view.isFirstLoad ? (
            <Skeleton
              active
              title={{ width: '40%' }}
              paragraph={{ rows: 4, width: ['70%', '55%', '85%', '45%'] }}
            />
          ) : (
            <>
              <div className={styles.info}>
                <div className={styles.head}>
                  <span
                    className={classNames(styles.dot, {
                      [styles.dotOnline]: view.isOnline && !view.hasFailed,
                    })}
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
                <div className={styles.countRow}>
                  <span className={styles.countValue}>{view.players}</span>
                  <span className={styles.countDivider}>/</span>
                  <span className={styles.countMax}>{view.maxPlayers}</span>
                  <span className={styles.countCaption}>{STATUS_PLAYERS_CAPTION}</span>
                </div>

                <ServerMeter
                  players={view.players}
                  maxPlayers={view.maxPlayers}
                  fillPercent={view.fillPercent}
                />
              </div>

              <ServerAddress address={view.address} />

              <div className={styles.footer}>
                <a href={view.connectHref} className={styles.action}>
                  <span>{STATUS_CONNECT_LABEL}</span>
                </a>
              </div>
            </>
          )}
        </div>

        {!view.isFirstLoad && view.isOnline && !view.hasFailed && (
          <div className={styles.rosterRow}>
            <ServerRoster roster={view.roster} />
          </div>
        )}
      </div>
    </section>
  );
}
