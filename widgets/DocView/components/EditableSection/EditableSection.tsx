import { DocSection } from '../DocSection';
import { SectionEditor } from '../SectionEditor';
import type { EditableSectionProps } from './types';
import styles from './EditableSection.module.scss';

export function EditableSection({ section, editing, onEdit, onClose, toolbar }: EditableSectionProps) {
  if (editing) return <SectionEditor section={section} onClose={onClose} />;

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <button type="button" className={styles.editButton} onClick={onEdit}>
          ✎ Редактировать
        </button>
        {toolbar}
      </div>
      <DocSection section={section} />
    </div>
  );
}
