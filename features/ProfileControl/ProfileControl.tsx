'use client';

import { ConfigProvider } from 'antd';
import { useAuthStore } from '@store/authStore';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { ProfileHeaderCard } from './components/ProfileHeaderCard';
import { AccountForm } from './components/AccountForm';
import { SecurityCard } from './components/SecurityCard';
import { SteamProfileCard } from './components/SteamProfileCard';
import { useProfileRefresh } from './hooks/useProfileRefresh';
import styles from './ProfileControl.module.scss';

export function ProfileControl() {
  const user = useAuthStore((state) => state.user);
  useProfileRefresh();

  if (!user) return null;

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <div className={styles.layout}>
        <div className={styles.main}>
          <ProfileHeaderCard user={user} />
          <HudCard title="Аккаунт">
            <AccountForm
              key={`${user.login}|${user.discord_id}|${user.steam_url}`}
              user={user}
            />
          </HudCard>
          <HudCard title="Безопасность">
            <SecurityCard />
          </HudCard>
        </div>
        {user.steam_url && (
          <aside className={styles.side}>
            <SteamProfileCard key={user.steam_url} steamUrl={user.steam_url} />
          </aside>
        )}
      </div>
    </ConfigProvider>
  );
}
