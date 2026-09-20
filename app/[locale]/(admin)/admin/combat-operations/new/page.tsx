import { CombatOperationEditor } from '@features/CombatOperationEditor';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Новая операция');

export default function AdminCombatOperationCreatePage() {
  return <CombatOperationEditor />;
}
