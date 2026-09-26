'use client';

import {
  STATUS_ROSTER_CAPTION,
  STATUS_ROSTER_COL_NAME,
  STATUS_ROSTER_COL_TIME,
  STATUS_ROSTER_EMPTY,
  STATUS_ROSTER_LESS,
  STATUS_ROSTER_MORE,
} from '../../constants';
import { RosterRow } from './components/RosterRow';
import { useRoster } from './hooks/useRoster';
import type { ServerRosterProps } from './types';
import styles from './ServerRoster.module.scss';

// Таблица «BEST SOLO TIME»: номер, позывной, время; лидер по налёту — первым
export function ServerRoster({ roster }: ServerRosterProps) {
  const { visible, hiddenCount, isExpanded, toggle } = useRoster(roster);

  return (
    <div className={styles.roster}>
      <div className={styles.head}>
        <span className={styles.caption}>{STATUS_ROSTER_CAPTION}</span>
        <span className={styles.count}>{roster.length}</span>
      </div>

      {roster.length === 0 ? (
        <p className={styles.empty}>{STATUS_ROSTER_EMPTY}</p>
      ) : (
        <>
          <ol className={styles.list}>
            {/* <li className={styles.columns} aria-hidden>
              <span className={styles.colIndex}>#</span>
              <span>{STATUS_ROSTER_COL_NAME}</span>
              <span className={styles.colTime}>{STATUS_ROSTER_COL_TIME}</span>
            </li> */}
            {visible.map((player, index) => (
              <RosterRow
                key={`${player.name}-${index}`}
                player={player}
                index={index + 1}
                isTop={index === 0}
              />
            ))}
          </ol>

          {hiddenCount > 0 && (
            <button
              type="button"
              className={styles.toggle}
              onClick={toggle}
              aria-expanded={isExpanded}
            >
              {isExpanded ? STATUS_ROSTER_LESS : `${STATUS_ROSTER_MORE} (+${hiddenCount})`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
