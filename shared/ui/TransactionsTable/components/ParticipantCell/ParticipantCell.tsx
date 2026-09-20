import type { ParticipantCellProps } from './types';
import styles from './ParticipantCell.module.scss';

export function ParticipantCell({ participant }: ParticipantCellProps) {
  if (!participant) return <>—</>;

  return (
    <div className={styles.cell}>
      <span className={styles.login}>{participant.login}</span>
      <span className={styles.email}>{participant.email}</span>
    </div>
  );
}
