import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { rpRulesContent } from '@widgets/Charter/content/rpRules';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Внутренние правила проекта');

export default function RpRulesPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={rpRulesContent} />
    </>
  );
}
