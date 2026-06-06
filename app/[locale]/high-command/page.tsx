import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { highCommandContent } from '@widgets/Charter/content/highCommand';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Высшее командование');

export default function HighCommandPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={highCommandContent} />
    </>
  );
}
