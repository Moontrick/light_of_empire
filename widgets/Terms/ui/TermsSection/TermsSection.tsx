import { TermsSectionProps } from "./types";
import styles from '../../Terms.module.scss';

export function TermsSection({ id, title, openId, onToggle, children }: TermsSectionProps) {
  const isOpen = openId === id;
  return (
    <section id={id} className={`${styles.section} ${isOpen ? styles.sectionOpen : ''}`}>
      <button
        type="button"
        className={styles.sectionHeader}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={() => onToggle(id)}
      >
        <span className={styles.sectionTitle}>{title}</span>
        <span className={styles.chevron} aria-hidden />
      </button>
      <div id={`${id}-panel`} className={styles.sectionBody} hidden={!isOpen}>
        <div className={styles.sectionBodyInner}>{children}</div>
      </div>
    </section>
  );
}
