import { CharterHeader } from '@widgets/CharterHeader';
import { Charter } from '@widgets/Charter';
import { shadowTroopersContent } from '@widgets/Charter/content/shadowTroopers';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Корпус тёмных штурмовиков');

export default function ShadowTroopersPage() {
  return (
    <>
      <CharterHeader />
      <Charter content={shadowTroopersContent} />
    </>
  );
}
