import { NewsEditor } from '@features/NewsEditor';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Редактирование новости');

interface AdminNewsEditPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AdminNewsEditPage({ params }: AdminNewsEditPageProps) {
  const { slug } = await params;
  return <NewsEditor slug={slug} />;
}
