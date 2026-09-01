import type { NewsPost } from '@/shared/types';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';

export interface NewsDateGroup {
  isoDate: string;
  label: string;
  startIndex: number;
  items: NewsPost[];
}

export function groupNewsByDate(news: NewsPost[]): NewsDateGroup[] {
  const sorted = [...news].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  return sorted.reduce<NewsDateGroup[]>((groups, item, index) => {
    const last = groups[groups.length - 1];

    if (last && last.isoDate === item.isoDate) {
      last.items.push(item);
    } else {
      groups.push({
        isoDate: item.isoDate,
        label: formatNewsDate(item.isoDate),
        startIndex: index,
        items: [item],
      });
    }

    return groups;
  }, []);
}
