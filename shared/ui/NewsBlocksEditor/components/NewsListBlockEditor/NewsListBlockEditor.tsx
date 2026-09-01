import { Input } from 'antd';
import { StringListEditor } from '@ui/BlocksEditor/components/StringListEditor';
import type { NewsListBlockEditorProps } from './types';
import styles from './NewsListBlockEditor.module.scss';

export function NewsListBlockEditor({ value, onChange }: NewsListBlockEditorProps) {
  return (
    <div className={styles.root}>
      <Input
        value={value.title ?? ''}
        onChange={(event) => onChange({ ...value, title: event.target.value || undefined })}
        placeholder="Заголовок списка (необязательно)"
      />
      <StringListEditor
        items={value.items}
        onChange={(items) => onChange({ ...value, items })}
        itemPlaceholder="Текст пункта"
      />
    </div>
  );
}
