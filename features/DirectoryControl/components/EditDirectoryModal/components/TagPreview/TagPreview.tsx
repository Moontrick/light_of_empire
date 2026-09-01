'use client';

import { Form } from 'antd';
import { DirectoryTag } from '@ui/DirectoryTag';
import { composeNameStyles } from '../../../../lib/nameStyles';
import { toColorString } from '../../../../lib/toColorString';
import type { TagPreviewProps } from './types';
import styles from './TagPreview.module.scss';

export function TagPreview({ form }: TagPreviewProps) {
  const name = Form.useWatch('name', form);
  const color = Form.useWatch('color', form);
  const stylePresets = Form.useWatch('stylePresets', form);

  return (
    <div className={styles.preview}>
      <span className={styles.label}>Превью тега</span>
      <span className={styles.tagRow}>
        <DirectoryTag
          entry={{
            name: name || 'Название',
            color: toColorString(color) || null,
            styles: composeNameStyles(stylePresets ?? []),
          }}
        />
      </span>
    </div>
  );
}
