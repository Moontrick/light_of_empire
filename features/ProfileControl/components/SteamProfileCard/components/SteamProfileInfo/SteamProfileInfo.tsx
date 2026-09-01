'use client';

import { Avatar } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { IconSteam } from '@/public/icons/IconSteam';
import type { SteamOnlineState } from '@/shared/api/steamProfile';
import type { SteamProfileInfoProps } from './types';
import styles from './SteamProfileInfo.module.scss';

const ONLINE_STATE_VIEW: Record<SteamOnlineState, { label: string; className: string }> = {
  online: { label: 'В сети', className: styles.stateOnline },
  'in-game': { label: 'В игре', className: styles.stateInGame },
  offline: { label: 'Не в сети', className: styles.stateOffline },
};

export function SteamProfileInfo({ profile, onCopyId }: SteamProfileInfoProps) {
  const state = ONLINE_STATE_VIEW[profile.onlineState];

  return (
    <div className={styles.body}>
      <div className={styles.identity}>
        <Avatar shape="square" size={64} src={profile.avatar || undefined} alt={profile.name} />
        <div className={styles.meta}>
          <span className={styles.name}>{profile.name}</span>
          <span className={state.className}>{state.label}</span>
        </div>
      </div>

      <div className={styles.idRow}>
        <span className={styles.idLabel}>SteamID64</span>
        <button
          type="button"
          className={styles.idValue}
          aria-label="Скопировать SteamID64"
          onClick={onCopyId}
        >
          {profile.steamId64}
          <CopyOutlined />
        </button>
      </div>

      <a className={styles.link} href={profile.profileUrl} target="_blank" rel="noreferrer">
        <IconSteam width={16} height={16} />
        Открыть профиль
      </a>
    </div>
  );
}
