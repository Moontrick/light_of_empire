import { Button, Input } from 'antd';
import { useImageBlockEditor } from './hooks/useImageBlockEditor';
import type { ImageBlockEditorProps } from './types';
import styles from './ImageBlockEditor.module.scss';

export function ImageBlockEditor({ value, onChange }: ImageBlockEditorProps) {
  const { inputRef, processing, openFileDialog, handleFileChange, setAlt, setCaption } =
    useImageBlockEditor({ value, onChange });

  return (
    <div className={styles.root}>
      {value.src && <img className={styles.preview} src={value.src} alt={value.alt ?? ''} />}
      <input
        ref={inputRef}
        className={styles.fileInput}
        type="file"
        accept="image/*"
        onChange={(event) => void handleFileChange(event)}
      />
      <Button onClick={openFileDialog} loading={processing}>
        {value.src ? 'Заменить' : 'Выбрать файл'}
      </Button>
      <Input
        value={value.alt ?? ''}
        onChange={(event) => setAlt(event.target.value)}
        placeholder="Alt-текст"
      />
      <Input
        value={value.caption ?? ''}
        onChange={(event) => setCaption(event.target.value)}
        placeholder="Подпись, необязательно"
      />
    </div>
  );
}
