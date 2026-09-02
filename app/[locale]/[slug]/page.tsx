import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { CharterHeader } from '@widgets/CharterHeader';
import { PageView } from '@widgets/PageView';
import { fetchPagesTree } from '@/shared/api/pages/server';
import { findTreeNode } from '@/shared/utils/pagesTree';
import { pageMetadata } from '@/shared/seo';

const FALLBACK_TITLE = 'Документы';

interface DynamicPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const node = findTreeNode(await fetchPagesTree(), slug);
  return pageMetadata(node?.name ?? FALLBACK_TITLE);
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
