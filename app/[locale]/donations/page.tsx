import { CharterHeader } from '@widgets/CharterHeader';
import { DonationsShowcase } from '@widgets/DonationsShowcase';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata(
  'Донат',
  'Товары за кредиты Империи: скины, привилегии и памятные знаки для бойцов Имперской Армии.',
);

export default function DonationsPage() {
  return (
    <>
      <CharterHeader />
      <DonationsShowcase />
    </>
  );
}
