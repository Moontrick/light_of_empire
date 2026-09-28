import { Input } from 'antd';
import { useLinkBlockEditor } from './hooks/useLinkBlockEditor';
import type { LinkBlockEditorProps } from './types';
import styles from './LinkBlockEditor.module.scss';

export function LinkBlockEditor(props: LinkBlockEditorProps) {
  const { url, text, urlInvalid, setUrl, setText } = useLinkBlockEditor(props);

  return (
    <div className={styles.root}>
      <Input
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        placeholder="https://example.com или /news"
        status={urlInvalid ? 'error' : undefined}
      />
      {urlInvalid && (
        <span className={styles.hint}>
          Адрес должен начинаться с https://, / или #
        </span>
      )}
      <Input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Подпись ссылки (необязательно, иначе покажем адрес)"
      />
    </div>
  );
}
