import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { criminalCodeContent } from '@widgets/Charter/content/criminalCode';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Уголовный кодекс ИББ');

export default function CriminalCodePage() {
  return (
    <>
      <CharterHeader />
      <Charter content={criminalCodeContent} />
    </>
  );
}
