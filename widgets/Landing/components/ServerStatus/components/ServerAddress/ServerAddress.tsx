'use client';

import { STATUS_ADDRESS_CAPTION, STATUS_COPY_LABEL } from '../../constants';
import { useCopyAddress } from './hooks/useCopyAddress';
import type { ServerAddressProps } from './types';
import styles from './ServerAddress.module.scss';

export function ServerAddress({ address }: ServerAddressProps) {
  const copy = useCopyAddress(address);

  return (
    <div className={styles.address}>
      <span className={styles.caption}>{STATUS_ADDRESS_CAPTION}</span>

      <div className={styles.row}>
        <span className={styles.value}>{address}</span>

        <button type="button" className={styles.copy} onClick={copy}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
            <rect x="9" y="9" width="11" height="11" stroke="currentColor" strokeWidth="1.6" />
            <path d="M15 5H4v11" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {STATUS_COPY_LABEL}
        </button>
      </div>
    </div>
  );
}
