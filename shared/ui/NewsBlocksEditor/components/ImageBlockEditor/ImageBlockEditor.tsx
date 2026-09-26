import { Input } from 'antd';
import { ImageDropZone } from '@ui/ImageDropZone';
import { useImageBlockEditor } from './hooks/useImageBlockEditor';
import type { ImageBlockEditorProps } from './types';
import styles from './ImageBlockEditor.module.scss';

export function ImageBlockEditor({ value, onChange }: ImageBlockEditorProps) {
  const { processing, previewUrl, handleFiles, setAlt, setCaption } = useImageBlockEditor({
    value,
    onChange,
  });

  return (
    <div className={styles.root}>
      <ImageDropZone
        previewUrl={previewUrl}
        previewAlt={value.alt ?? ''}
        processing={processing}
        onFiles={(files) => void handleFiles(files)}
      />
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
