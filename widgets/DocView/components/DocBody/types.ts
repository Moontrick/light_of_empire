import type { ReactNode } from 'react';
import type { CharterSectionData } from '@/shared/types';

export interface DocBodyProps {
  sections: CharterSectionData[];
  searchPlaceholder?: string;
  renderSection?: (section: CharterSectionData) => ReactNode;
  // Секция, которую поиск не должен скрывать (открыта в редакторе с несохранёнными правками)
  pinnedSlug?: string | null;
}
