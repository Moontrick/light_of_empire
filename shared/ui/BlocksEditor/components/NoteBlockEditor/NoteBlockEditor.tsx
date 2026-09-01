import { Input } from 'antd';
import { RichTextInput } from '@ui/RichTextInput';
import { StringListEditor } from '../StringListEditor';
import { useNoteBlockEditor } from './hooks/useNoteBlockEditor';
import type { NoteBlockEditorProps } from './types';
import styles from './NoteBlockEditor.module.scss';

export function NoteBlockEditor(props: NoteBlockEditorProps) {
  const { title, text, items, setTitle, setText, setItems } = useNoteBlockEditor(props);

  return (
    <div className={styles.root}>
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Заголовок (необязательно)"
      />
      <RichTextInput value={text} onChange={setText} placeholder="Текст" />
      <StringListEditor items={items} onChange={setItems} itemPlaceholder="Текст пункта" />
    </div>
  );
}
