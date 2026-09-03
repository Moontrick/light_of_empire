import type { DiscordSettingDto } from '@/shared/api/discordBot';

export interface SettingCardProps {
  setting: DiscordSettingDto;
  saving: boolean;
  disabled: boolean;
  onSave: (value: string) => void;
  onReset: () => void;
}
