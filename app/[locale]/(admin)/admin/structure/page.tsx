import { StructureControl } from '@features/StructureControl';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Структура — управление');

export default function AdminStructurePage() {
  return <StructureControl />;
}
