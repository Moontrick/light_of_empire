import { CharterHeader } from '@widgets/CharterHeader';
import { CombatOperationsFeed } from '@widgets/CombatOperationsFeed';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata(
  'Боевые операции',
  'Боевые операции Имперской Армии: приказы на выход, сборы и отчёты о проведённых операциях.',
);

export default function CombatOperationsPage() {
  return (
    <>
      <CharterHeader />
      <CombatOperationsFeed />
    </>
  );
}
