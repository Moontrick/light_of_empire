'use client';

import { Button, Tag } from 'antd';
import { ImageDropZone } from '@ui/ImageDropZone';
import { RichTextInput } from '@ui/RichTextInput';
import { AttachmentList } from './components/AttachmentList';
import { useCommentComposer } from './hooks/useCommentComposer';
import type { CommentComposerProps } from './types';
import styles from './CommentComposer.module.scss';

export function CommentComposer({
  value,
  onChange,
  onSubmit,
  onCancel,
  submitting = false,
  submitLabel = 'Отправить',
  placeholder = 'Ваш комментарий',
  maxImages,
  replyTo,
}: CommentComposerProps) {
  const { text, images, setText, addFiles, removeImage, uploading, canSubmit, imagesLeft } =
    useCommentComposer({ value, onChange, maxImages });

  const busy = submitting || uploading;

  return (
    <div className={styles.root}>
      {replyTo && (
        <div className={styles.replyTo}>
          <Tag closable onClose={replyTo.onClear}>
            Ответ на @{replyTo.login}
          </Tag>
        </div>
      )}
      <RichTextInput value={text} onChange={setText} placeholder={placeholder} rows={4} />
      <AttachmentList images={images} disabled={busy} onRemove={removeImage} />
      <ImageDropZone
        multiple
        processing={uploading}
        disabled={submitting || imagesLeft === 0}
        hint={
          imagesLeft === 0
            ? 'Достигнут лимит картинок'
            : imagesLeft !== null
              ? `Прикрепить картинки (ещё ${imagesLeft})`
              : 'Прикрепить картинки'
        }
        onFiles={(files) => void addFiles(files)}
      />
      <div className={styles.actions}>
        <Button type="primary" loading={submitting} disabled={!canSubmit} onClick={onSubmit}>
          {submitLabel}
        </Button>
        {onCancel && (
          <Button onClick={onCancel} disabled={busy}>
            Отмена
          </Button>
        )}
      </div>
    </div>
  );
}
