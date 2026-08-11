import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { roleplayContent } from '@widgets/Charter/content/roleplay';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Отыгровки');

export default function RoleplayPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={roleplayContent} />
    </>
  );
}
