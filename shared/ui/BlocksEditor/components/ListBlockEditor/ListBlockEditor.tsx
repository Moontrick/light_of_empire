import { Switch } from 'antd';
import { StringListEditor } from '../StringListEditor';
import type { ListBlockEditorProps } from './types';
import styles from './ListBlockEditor.module.scss';

export function ListBlockEditor({ value, onChange }: ListBlockEditorProps) {
  return (
    <div className={styles.root}>
      <label className={styles.orderedToggle}>
        <Switch
          checked={value.ordered ?? false}
          onChange={(ordered) => onChange({ ...value, ordered })}
        />
        Нумерованный
      </label>
      <StringListEditor
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        itemPlaceholder="Текст пункта"
      />
    </div>
  );
}
