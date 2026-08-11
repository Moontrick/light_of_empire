import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { discordRulesContent } from '@widgets/Charter/content/discordRules';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Правила Discord-сервера');

export default function DiscordRulesPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={discordRulesContent} />
    </>
  );
}
