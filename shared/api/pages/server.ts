import type { PageTreeNodeDto } from './types';
import { PAGES_ROUTES } from './routes';

// Обычный fetch без axios-интерцепторов: вызывается из sitemap и generateMetadata на сервере
export async function fetchPagesTree(): Promise<PageTreeNodeDto[]> {
  const base = process.env.NEXT_PUBLIC_BACK_PROD;
  if (!base) return [];

  try {
    const response = await fetch(`${base}/api/v1${PAGES_ROUTES.PAGES}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return [];
    return (await response.json()) as PageTreeNodeDto[];
  } catch (error) {
    console.error('[pages] Failed to fetch pages tree', error);
    return [];
  }
}
