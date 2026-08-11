import Image from 'next/image';
import type { ChronicleEntryProps } from './types';
import styles from './ChronicleEntry.module.scss';

export function ChronicleEntry({ entry }: ChronicleEntryProps) {
  return (
    <li className={styles.item}>
      <span className={styles.marker} aria-hidden />

      <article className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>{entry.author}</span>
          <span className={styles.dot} aria-hidden />
          <time className={styles.date}>{entry.date}</time>
        </div>

        {entry.title && <h2 className={styles.title}>{entry.title}</h2>}

        <div className={styles.body}>
          {entry.blocks.map((block, index) => {
            if (block.kind === 'image') {
              return (
                <div key={`image-${index}`} className={styles.imageWrap}>
                  <Image
                    src={block.image.src}
                    alt={block.image.alt}
                    width={block.image.width}
                    height={block.image.height}
                    className={styles.image}
                    sizes="(max-width: 640px) 100vw, 720px"
                  />
                </div>
              );
            }

            return (
              <p key={`paragraph-${index}`} className={styles.paragraph}>
                {block.text}
              </p>
            );
          })}
        </div>

        {entry.video && (
          <a
            href={entry.video.url}
            target="_blank"
            rel="noreferrer"
            className={styles.video}
          >
            <span aria-hidden>▶</span> {entry.video.title}
          </a>
        )}
      </article>
    </li>
  );
}
