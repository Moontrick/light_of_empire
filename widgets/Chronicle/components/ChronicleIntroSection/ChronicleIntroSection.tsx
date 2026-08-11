import type { ChronicleIntroSectionProps } from './types';
import styles from './ChronicleIntroSection.module.scss';

export function ChronicleIntroSection({ section }: ChronicleIntroSectionProps) {
  return (
    <div className={styles.introSection}>
      <h2 className={styles.introTitle}>{section.title}</h2>

      {section.paragraphs.map((paragraph, index) => (
        <p key={index} className={styles.introParagraph}>
          {paragraph}
        </p>
      ))}

      {section.items && (
        <ul className={styles.introList}>
          {section.items.map((item) => (
            <li key={item} className={styles.introItem}>
              {item}
            </li>
          ))}
        </ul>
      )}

      {section.video && (
        <a
          href={section.video.url}
          target="_blank"
          rel="noreferrer"
          className={styles.introVideo}
        >
          <span aria-hidden>▶</span> {section.video.title}
        </a>
      )}
    </div>
  );
}
