import type { NewsItem } from '@/shared/news';

export interface NewsDateGroup {
  isoDate: string;
  label: string;
  startIndex: number;
  items: NewsItem[];
}

const MONTHS = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function formatDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

export function groupNewsByDate(news: NewsItem[]): NewsDateGroup[] {
  const sorted = [...news].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  return sorted.reduce<NewsDateGroup[]>((groups, item, index) => {
    const last = groups[groups.length - 1];

    if (last && last.isoDate === item.isoDate) {
      last.items.push(item);
    } else {
      groups.push({
        isoDate: item.isoDate,
        label: formatDateLabel(item.isoDate),
        startIndex: index,
        items: [item],
      });
    }

    return groups;
  }, []);
}
