'use client';

import classNames from 'classnames';
import { Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useImageDropZone } from './hooks/useImageDropZone';
import type { ImageDropZoneProps } from './types';
import styles from './ImageDropZone.module.scss';

const DEFAULT_ACCEPT = 'image/jpeg,image/png,image/webp,image/avif';

export function ImageDropZone(props: ImageDropZoneProps) {
  const { previewUrl, previewAlt, multiple, accept = DEFAULT_ACCEPT, processing, hint } = props;
  const { inputRef, dragging, inactive, openFileDialog, onInputChange, onDragOver, onDragLeave, onDrop, onKeyDown } =
    useImageDropZone(props);

  const defaultHint = previewUrl
    ? 'Перетащите новую картинку или нажмите, чтобы заменить'
    : multiple
      ? 'Перетащите картинки или нажмите, чтобы выбрать'
      : 'Перетащите картинку или нажмите, чтобы выбрать';

  return (
    <div
      role="button"
      tabIndex={inactive ? -1 : 0}
      aria-disabled={inactive}
      aria-label={hint ?? defaultHint}
      className={classNames(styles.zone, {
        [styles.dragging]: dragging,
        [styles.inactive]: inactive,
        [styles.withPreview]: Boolean(previewUrl),
      })}
      onClick={openFileDialog}
      onKeyDown={onKeyDown}
      onDragOver={onDragOver}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {previewUrl && <img className={styles.preview} src={previewUrl} alt={previewAlt ?? ''} />}
      <div className={styles.overlay}>
        {processing ? (
          <Spin />
        ) : (
          <>
            <UploadOutlined className={styles.icon} />
            <span className={styles.hint}>{hint ?? defaultHint}</span>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        className={styles.fileInput}
        type="file"
        accept={accept}
        multiple={multiple}
        tabIndex={-1}
        onChange={onInputChange}
      />
    </div>
  );
}
