import { Button } from 'antd';
import { RichTextInput } from '@ui/RichTextInput';
import type { StringListEditorProps } from './types';
import styles from './StringListEditor.module.scss';

export function StringListEditor({
  items,
  onChange,
  addLabel = '+ Пункт',
  itemPlaceholder,
}: StringListEditorProps) {
  const updateItem = (index: number, text: string) =>
    onChange(items.map((item, i) => (i === index ? text : item)));

  const removeItem = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className={styles.root}>
      {items.map((item, index) => (
        <div key={index} className={styles.row}>
          <RichTextInput
            value={item}
            onChange={(text) => updateItem(index, text)}
            placeholder={itemPlaceholder}
            rows={2}
          />
          <Button size="small" disabled={items.length === 1} onClick={() => removeItem(index)}>
            −
          </Button>
        </div>
      ))}
      <Button size="small" onClick={() => onChange([...items, ''])}>
        {addLabel}
      </Button>
    </div>
  );
}
