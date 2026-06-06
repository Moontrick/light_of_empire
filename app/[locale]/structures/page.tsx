import { CharterHeader } from '@widgets/CharterHeader';
import { Hub } from '@widgets/Hub';
import { structuresContent } from '@widgets/Hub/content/structures';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Структуры');

export default function StructuresPage() {
  return (
    <>
      <CharterHeader />
      <Hub content={structuresContent} />
    </>
  );
}
