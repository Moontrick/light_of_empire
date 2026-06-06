import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Устав Имперской Армии');

export default function UstavPage() {
  return (
    <>
      <CharterHeader />
      <Charter />
    </>
  );
}
