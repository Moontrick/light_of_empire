import { HudCard } from '@ui/HudCard';
import { UserAvatar } from '@ui/UserAvatar';
import { DirectoryTag } from '@ui/DirectoryTag';
import { RoleBadge } from '@ui/RoleBadge';
import { ProfileStats } from './components/ProfileStats';
import { LinkedAccounts } from './components/LinkedAccounts';
import type { ProfileHeroProps } from './types';
import styles from './ProfileHero.module.scss';

export function ProfileHero({
  user,
  transactionsTotal,
  purchasesTotal,
  loading,
  onEditAccount,
}: ProfileHeroProps) {
  return (
    <HudCard>
      <span className={styles.glow} aria-hidden />
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <UserAvatar size="lg" alt={user.login} />
            <div className={styles.meta}>
              <div className={styles.loginRow}>
                <span className={styles.login}>{user.login}</span>
                <RoleBadge role={user.role} />
              </div>
              <span className={styles.email}>{user.email}</span>
              <div className={styles.tags}>
                {user.position ? (
                  <DirectoryTag entry={user.position} size="lg" />
                ) : (
                  <span className={styles.tagEmpty}>Должность не назначена</span>
                )}
                {user.formation ? (
                  <DirectoryTag entry={user.formation} size="lg" />
                ) : (
                  <span className={styles.tagEmpty}>Вне формирования</span>
                )}
              </div>
            </div>
          </div>

          {/* <ProfileStats
            balance={user.balance}
            transactionsTotal={transactionsTotal}
            purchasesTotal={purchasesTotal}
            loading={loading}
          /> */}
        </div>

        <LinkedAccounts
          discordId={user.discord_id}
          steamUrl={user.steam_url}
          onEdit={onEditAccount}
        />

        <span className={styles.hint}>Должность и формирование назначает командование</span>
      </div>
    </HudCard>
  );
}
