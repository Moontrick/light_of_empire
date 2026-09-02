'use client';

import { useEffect, useState } from 'react';
import type { SteamProfile } from '@/shared/api/steamProfile';
import { alertHandler } from '@/shared/utils/alertHandler';

const STEAM_PROFILE_ENDPOINT = '/internal/steam-profile';

export function useSteamProfileCard(steamUrl: string) {
  const [profile, setProfile] = useState<SteamProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setFailed(false);
    setProfile(null);

    fetch(`${STEAM_PROFILE_ENDPOINT}?url=${encodeURIComponent(steamUrl)}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Steam profile request failed: ${response.status}`);
        }
        return (await response.json()) as SteamProfile;
      })
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [steamUrl]);

  const copySteamId = async () => {
    if (!profile) return;
    try {
      await navigator.clipboard.writeText(profile.steamId64);
      alertHandler.addAlert({ status: 'success', defaultText: 'SteamID64 скопирован' });
    } catch {
      alertHandler.addAlert({ defaultText: 'Не удалось скопировать SteamID64' });
    }
  };

  return { profile, loading, failed, copySteamId };
}
