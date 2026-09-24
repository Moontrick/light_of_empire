'use client';

import { usePathname } from '@/shared/i18n/navigation';
import { CharterHeader } from '@widgets/CharterHeader';

// Шапка живёт в корневом лейауте и не перемонтируется при навигации;
// на главной она прозрачная и накрывает hero
export function SiteHeader() {
  const pathname = usePathname();

  return <CharterHeader transparent={pathname === '/'} />;
}
