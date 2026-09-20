import { CombatOperationsControl } from '@features/CombatOperationsControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Боевые операции — управление');

export default function AdminCombatOperationsPage() {
  return <CombatOperationsControl />;
}
