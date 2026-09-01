import type { DocSectionData } from '@/shared/types';
import { useDocEditor } from '../../../context';

export function useSectionToolbar(section: DocSectionData, sections: DocSectionData[]) {
  const { ops, flags } = useDocEditor();

  const index = sections.findIndex((item) => item.id === section.id);
  const deleting = flags.savingSectionId === section.id;

  const move = (offset: number) => {
    const ids = sections.map((item) => item.id);
    const target = index + offset;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    void ops.reorderSections(ids);
  };

  return {
    canMoveUp: index > 0,
    canMoveDown: index >= 0 && index < sections.length - 1,
    reordering: flags.reordering,
    deleting,
    moveUp: () => move(-1),
    moveDown: () => move(1),
    remove: () => void ops.deleteSection(section.id),
  };
}
