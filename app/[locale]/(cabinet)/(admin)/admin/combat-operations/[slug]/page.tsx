import { CombatOperationEditor } from '@features/CombatOperationEditor';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Редактирование операции');

interface AdminCombatOperationEditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminCombatOperationEditPage({
  params,
}: AdminCombatOperationEditPageProps) {
  const { slug } = await params;
  return <CombatOperationEditor slug={slug} />;
}
