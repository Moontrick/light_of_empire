import styles from './HudCorners.module.scss';

export function HudCorners() {
  return (
    <>
      <span className={`${styles.corner} ${styles.tl}`} aria-hidden />
      <span className={`${styles.corner} ${styles.tr}`} aria-hidden />
      <span className={`${styles.corner} ${styles.bl}`} aria-hidden />
      <span className={`${styles.corner} ${styles.br}`} aria-hidden />
    </>
  );
}
