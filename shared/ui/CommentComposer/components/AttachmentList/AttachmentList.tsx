import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { resolveImageSrc } from '@/shared/utils/resolveImageSrc';
import type { AttachmentListProps } from './types';
import styles from './AttachmentList.module.scss';

export function AttachmentList({ images, disabled, onRemove }: AttachmentListProps) {
  if (images.length === 0) return null;

  return (
    <ul className={styles.list}>
      {images.map((src, index) => (
        <li key={`${src}-${index}`} className={styles.item}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={resolveImageSrc(src) ?? undefined} alt="" className={styles.image} />
          <Button
            size="small"
            shape="circle"
            icon={<CloseOutlined />}
            aria-label="Убрать картинку"
            className={styles.remove}
            disabled={disabled}
            onClick={() => onRemove(index)}
          />
        </li>
      ))}
    </ul>
  );
}
