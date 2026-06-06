import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { inquisitoriusContent } from '@widgets/Charter/content/inquisitorius';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Инквизиторий');

export default function InquisitoriusPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={inquisitoriusContent} />
    </>
  );
}
