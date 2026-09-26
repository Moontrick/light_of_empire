import Image from 'next/image';
import { STATUS_LIVE_LABEL, STATUS_PREVIEW_ALT, STATUS_PREVIEW_IMAGE } from '../../constants';
import styles from './ServerPreview.module.scss';

export function ServerPreview() {
  return (
    <div className={styles.preview}>
      <Image
        src={STATUS_PREVIEW_IMAGE}
        alt={STATUS_PREVIEW_ALT}
        fill
        className={styles.image}
        // Кадр занимает чуть больше половины плитки на десктопе и всю ширину на телефоне
        sizes="(max-width: 900px) 100vw, 55vw"
      />

      <span className={styles.fade} aria-hidden />

      <span className={styles.live}>
        <span className={styles.pulse} aria-hidden />
        {STATUS_LIVE_LABEL}
      </span>
    </div>
  );
}
