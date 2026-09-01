import type { SteamProfile } from '@/shared/api/steamProfile';

export interface SteamProfileInfoProps {
  profile: SteamProfile;
  onCopyId: () => void;
}
