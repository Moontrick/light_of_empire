import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { likbezContent } from '@widgets/Charter/content/likbez';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Ликбезы');

export default function LikbezPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={likbezContent} />
    </>
  );
}
