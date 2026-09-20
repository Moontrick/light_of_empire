import { setRequestLocale } from 'next-intl/server';
import { CharterHeader } from '@widgets/CharterHeader';
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

  return (
    <>
      <CharterHeader />
      <CombatOperationArticle slug={slug} />
    </>
  );
}
