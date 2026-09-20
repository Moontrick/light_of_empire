'use client';

import classNames from 'classnames';
import { useImageGallery } from './hooks/useImageGallery';
import type { ImageGalleryProps } from './types';
import styles from './ImageGallery.module.scss';

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const { selected, select } = useImageGallery(images);

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        {selected ? (
          <img src={selected.url} alt={alt} className={styles.mainImage} />
        ) : (
          <span className={styles.placeholder}>Без фото</span>
        )}
      </div>

      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              className={classNames(styles.thumb, {
                [styles.thumbActive]: selected?.id === image.id,
              })}
              onClick={() => select(image.id)}
              aria-label={`Фото ${index + 1}`}
            >
              <img src={image.url} alt="" className={styles.thumbImage} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
