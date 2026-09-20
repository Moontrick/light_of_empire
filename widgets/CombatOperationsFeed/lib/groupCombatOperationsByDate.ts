import type { CombatOperation } from '@/shared/types';
import { formatNewsDate } from '@/shared/utils/formatNewsDate';

export interface CombatOperationDateGroup {
  isoDate: string;
  label: string;
  startIndex: number;
  items: CombatOperation[];
}

export function groupCombatOperationsByDate(
  operations: CombatOperation[],
): CombatOperationDateGroup[] {
  const sorted = [...operations].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  return sorted.reduce<CombatOperationDateGroup[]>((groups, item, index) => {
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
