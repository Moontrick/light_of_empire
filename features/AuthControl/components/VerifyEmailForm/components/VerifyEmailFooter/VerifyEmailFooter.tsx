import type { VerifyEmailFooterProps } from './types';
import styles from './VerifyEmailFooter.module.scss';

export function VerifyEmailFooter({ onChangeEmail }: VerifyEmailFooterProps) {
  return (
    <>
      Ошиблись в адресе?{' '}
      <button type="button" className={styles.link} onClick={onChangeEmail}>
        Изменить email
      </button>
    </>
  );
}
