import type { Metadata } from 'next';
import { Landing } from '@widgets/Landing';
import { localeAlternates } from '@/shared/seo';

// Заголовок и описание — базовые из layout; главной нужен только свой canonical
export const metadata: Metadata = {
  alternates: localeAlternates('/'),
};

export default function LandingPage() {
  return <Landing />;
}
