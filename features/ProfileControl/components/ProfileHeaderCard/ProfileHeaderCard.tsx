import classNames from 'classnames';
import { HudCard } from '@ui/HudCard';
import { UserAvatar } from '@ui/UserAvatar';
import { DirectoryTag } from '@ui/DirectoryTag';
import { RoleBadge } from '@ui/RoleBadge';
import type { ProfileHeaderCardProps } from './types';
import styles from './ProfileHeaderCard.module.scss';

export function ProfileHeaderCard({ user }: ProfileHeaderCardProps) {
  return (
    <HudCard>
      <div className={styles.identityRow}>
        <UserAvatar size="lg" alt={user.login} />
        <div className={styles.identity}>
          <div className={styles.loginRow}>
            <span className={styles.login}>{user.login}</span>
            <RoleBadge role={user.role} />
          </div>
          <span className={styles.email}>{user.email}</span>
        </div>
      </div>

      <div className={styles.serviceGrid}>
        <div className={styles.tile}>
          <span className={styles.tileLabel}>Должность</span>
          {user.position ? (
            <span>
              <DirectoryTag entry={user.position} size="lg" />
            </span>
          ) : (
            <span className={classNames(styles.tileValue, styles.tileEmpty)}>
              Не назначена
            </span>
          )}
        </div>
        <div className={styles.tile}>
          <span className={styles.tileLabel}>Формирование</span>
          {user.formation ? (
            <span>
              <DirectoryTag entry={user.formation} size="lg" />
            </span>
          ) : (
            <span className={classNames(styles.tileValue, styles.tileEmpty)}>
              Не назначено
            </span>
          )}
        </div>
      </div>

      <span className={styles.hint}>
        Должность и формирование назначает командование
      </span>
    </HudCard>
  );
}
