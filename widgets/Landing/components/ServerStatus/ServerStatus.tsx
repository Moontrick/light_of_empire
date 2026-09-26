'use client';

import classNames from 'classnames';
import { Skeleton } from 'antd';
import { useServerStatusView } from './hooks/useServerStatusView';
import { ServerPreview } from './components/ServerPreview';
import { ServerMeter } from './components/ServerMeter';
import { ServerAddress } from './components/ServerAddress';
import { ServerRoster } from './components/ServerRoster';
import {
  STATUS_BAR_TITLE,
  STATUS_CONNECT_LABEL,
  STATUS_CONNECT_SUB,
  STATUS_FILL_CAPTION,
  STATUS_LABEL_FAILED,
  STATUS_LABEL_OFFLINE,
  STATUS_LABEL_ONLINE,
  STATUS_MAP_UNKNOWN,
  STATUS_STAT_MAP,
  STATUS_STAT_PLAYERS,
  STATUS_STAT_STATE,
  STATUS_STATE_OFFLINE,
  STATUS_STATE_ONLINE,
} from './constants';
import styles from './ServerStatus.module.scss';

// Экран STATS из Battlefront: тёмная шапка плитки, кадр, колонка показателей
// с подписями над значениями и личный состав как таблица рекордов.
export function ServerStatus() {
  const view = useServerStatusView();

  const isLive = view.isOnline && !view.hasFailed;
  const statusLabel = view.hasFailed
    ? STATUS_LABEL_FAILED
    : view.isOnline
      ? STATUS_LABEL_ONLINE
      : STATUS_LABEL_OFFLINE;

  return (
    <section className={styles.status}>
      <div className={styles.inner}>
        <header className={styles.bar}>
          <div className={styles.barMain}>
            <span className={styles.barTitle}>{STATUS_BAR_TITLE}</span>
            {!view.isFirstLoad && (
              <span className={styles.barStatus}>
                <span className={classNames(styles.dot, { [styles.dotOnline]: isLive })} aria-hidden />
                {statusLabel}
              </span>
            )}
          </div>
          {!view.isFirstLoad && (
            <span className={styles.barCount}>
              {view.players}
              <span className={styles.barMax}>/{view.maxPlayers}</span>
            </span>
          )}
        </header>

        <div className={classNames(styles.grid, { [styles.gridWithRoster]: isLive })}>
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
                <h3 className={styles.name}>{view.serverName}</h3>

                <dl className={styles.stats}>
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>{STATUS_STAT_PLAYERS}</dt>
                    <dd className={styles.statValue}>
                      {view.players}
                      <span className={styles.statMax}>/{view.maxPlayers}</span>
                    </dd>
                  </div>
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>{STATUS_STAT_MAP}</dt>
                    <dd className={classNames(styles.statValue, styles.statValueSmall)}>
                      {view.map || STATUS_MAP_UNKNOWN}
                    </dd>
                  </div>
                  <div className={styles.stat}>
                    <dt className={styles.statLabel}>{STATUS_STAT_STATE}</dt>
                    <dd className={classNames(styles.statValue, styles.statValueSmall)}>
                      {isLive ? STATUS_STATE_ONLINE : STATUS_STATE_OFFLINE}
                    </dd>
                  </div>
                </dl>

                <div className={styles.meter}>
                  <ServerMeter
                    players={view.players}
                    maxPlayers={view.maxPlayers}
                    fillPercent={view.fillPercent}
                  />
                  <span className={styles.meterCaption}>
                    {view.fillPercent}% {STATUS_FILL_CAPTION}
                  </span>
                </div>

                <ServerAddress address={view.address} />

                <a href={view.connectHref} className={styles.action}>
                  <span className={styles.actionTitle}>{STATUS_CONNECT_LABEL}</span>
                  <span className={styles.actionSub}>{STATUS_CONNECT_SUB}</span>
                </a>
              </>
            )}
          </div>

          {!view.isFirstLoad && isLive && (
            <aside className={styles.rosterCol}>
              <ServerRoster roster={view.roster} />
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
