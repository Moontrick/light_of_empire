import { setRequestLocale } from 'next-intl/server';
import { CharterHeader } from '@widgets/CharterHeader';
import { PageView } from '@widgets/PageView';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Документы');

interface DynamicPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CharterHeader />
      <PageView slug={slug} />
    </>
  );
}
