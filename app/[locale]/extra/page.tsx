import { CharterHeader } from '@widgets/CharterHeader';
import { Hub } from '@widgets/Hub';
import { extraContent } from '@widgets/Hub/content/extra';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Дополнительно');

export default function ExtraPage() {
  return (
    <>
      <CharterHeader />
      <Hub content={extraContent} />
    </>
  );
}
