import { IconDiscord } from '@/public/icons/IconDiscord';
import { IconSteam } from '@/public/icons/IconSteam';
import { LinkedAccountRow } from './components/LinkedAccountRow';
import type { LinkedAccountsProps } from './types';
import styles from './LinkedAccounts.module.scss';

const stripProtocol = (url: string) => url.replace(/^https?:\/\//, '');

export function LinkedAccounts({ discordId, steamUrl, onEdit }: LinkedAccountsProps) {
  return (
    <ul className={styles.list}>
      <LinkedAccountRow
        icon={<IconDiscord width={18} height={18} />}
        name="Discord"
        value={discordId}
        onEdit={() => onEdit('discord_id')}
      />
      <LinkedAccountRow
        icon={<IconSteam width={18} height={18} />}
        name="Steam"
        value={steamUrl ? stripProtocol(steamUrl) : null}
        href={steamUrl}
        onEdit={() => onEdit('steam_url')}
      />
    </ul>
  );
}
