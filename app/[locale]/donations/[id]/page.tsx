import { setRequestLocale } from 'next-intl/server';
import { CharterHeader } from '@widgets/CharterHeader';
import { DonationArticle } from '@widgets/DonationArticle';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Донат');

interface DonationArticlePageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function DonationArticlePage({ params }: DonationArticlePageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CharterHeader />
      <DonationArticle idParam={id} />
    </>
  );
}
