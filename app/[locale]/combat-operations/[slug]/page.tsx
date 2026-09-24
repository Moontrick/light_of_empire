import { setRequestLocale } from 'next-intl/server';
import { CombatOperationArticle } from '@widgets/CombatOperationArticle';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Боевые операции');

interface CombatOperationArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function CombatOperationArticlePage({
  params,
}: CombatOperationArticlePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return <CombatOperationArticle slug={slug} />;
}
