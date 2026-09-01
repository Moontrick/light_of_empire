'use client';

import { Skeleton } from 'antd';
import { HudCard } from '@ui/HudCard';
import { SteamProfileInfo } from './components/SteamProfileInfo';
import { useSteamProfileCard } from './hooks/useSteamProfileCard';
import type { SteamProfileCardProps } from './types';
import styles from './SteamProfileCard.module.scss';

export function SteamProfileCard({ steamUrl }: SteamProfileCardProps) {
  const { profile, loading, failed, copySteamId } = useSteamProfileCard(steamUrl);

  if (loading) {
    return (
      <HudCard title="Steam">
        <Skeleton active avatar paragraph={{ rows: 2 }} />
      </HudCard>
    );
  }

  if (failed || !profile) {
    return (
      <HudCard title="Steam">
        <p className={styles.error}>Не удалось получить данные Steam</p>
        <a className={styles.fallbackLink} href={steamUrl} target="_blank" rel="noreferrer">
          Открыть профиль
        </a>
      </HudCard>
    );
  }

  return (
    <HudCard title="Steam">
      <SteamProfileInfo profile={profile} onCopyId={copySteamId} />
    </HudCard>
  );
}
