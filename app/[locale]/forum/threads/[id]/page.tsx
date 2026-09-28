import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ForumThread } from '@widgets/ForumThread';
import { pageMetadata } from '@/shared/seo';

export const metadata = pageMetadata('Форум');

interface ForumThreadPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ForumThreadPage({ params }: ForumThreadPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const threadId = Number(id);
  if (!Number.isInteger(threadId) || threadId <= 0) notFound();

  return <ForumThread id={threadId} />;
}
