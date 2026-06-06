import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { militaryPoliceContent } from '@widgets/Charter/content/militaryPolice';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Военная полиция');

export default function MilitaryPolicePage() {
  return (
    <>
      <CharterHeader />
      <Charter content={militaryPoliceContent} />
    </>
  );
}
