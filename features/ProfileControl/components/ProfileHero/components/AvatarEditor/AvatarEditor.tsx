'use client';

import { Spin } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { UserAvatar } from '@ui/UserAvatar';
import { useAvatarEditor } from './hooks/useAvatarEditor';
import type { AvatarEditorProps } from './types';
import styles from './AvatarEditor.module.scss';

const ACCEPT = 'image/jpeg,image/png,image/webp,image/avif';

export function AvatarEditor({ login, avatarUrl }: AvatarEditorProps) {
  const { inputRef, uploading, openFileDialog, onFileChange } = useAvatarEditor();

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Сменить аватар"
        title="Сменить аватар"
        disabled={uploading}
        onClick={openFileDialog}
      >
        <span className={styles.image}>
          <UserAvatar size="lg" alt={login} src={avatarUrl} />
        </span>
        <span className={styles.overlay}>
          {uploading ? <Spin size="small" /> : <CameraOutlined />}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className={styles.input}
        onChange={onFileChange}
      />
    </>
  );
}
