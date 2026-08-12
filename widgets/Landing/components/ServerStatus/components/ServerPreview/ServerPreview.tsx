import Image from 'next/image';
import { STATUS_LIVE_LABEL, STATUS_PREVIEW_ALT } from '../../constants';
import styles from './ServerPreview.module.scss';

export function ServerPreview() {
  return (
    <div className={styles.preview}>
      <Image
        src="/images/server.jpg"
        alt={STATUS_PREVIEW_ALT}
        fill
        className={styles.image}
        // Кадр занимает всю ширину минус панель данных (max 520px) и отступы секции (44px).
        sizes="(max-width: 900px) 100vw, calc(100vw - 564px)"
      />

      <span className={styles.fade} aria-hidden />

      <span className={styles.live}>
        <span className={styles.pulse} aria-hidden />
        {STATUS_LIVE_LABEL}
      </span>
    </div>
  );
}
