'use client';

import {
  STATUS_ROSTER_CAPTION,
  STATUS_ROSTER_EMPTY,
  STATUS_ROSTER_LESS,
  STATUS_ROSTER_MORE,
} from '../../constants';
import { RosterChip } from './components/RosterChip';
import { useRoster } from './hooks/useRoster';
import type { ServerRosterProps } from './types';
import styles from './ServerRoster.module.scss';

export function ServerRoster({ roster }: ServerRosterProps) {
  const { visible, hiddenCount, isExpanded, toggle } = useRoster(roster);

  return (
    <div className={styles.roster}>
      {roster.length === 0 ? (
        <p className={styles.empty}>{STATUS_ROSTER_EMPTY}</p>
      ) : (
        <>
          <ul className={styles.list}>
            {visible.map((player, index) => (
              <RosterChip
                key={`${player.name}-${index}`}
                player={player}
                isTop={index === 0}
              />
            ))}
          </ul>

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
