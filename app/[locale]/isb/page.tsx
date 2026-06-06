import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { isbContent } from '@widgets/Charter/content/isb';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Имперская служба безопасности');

export default function IsbPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={isbContent} />
    </>
  );
}
