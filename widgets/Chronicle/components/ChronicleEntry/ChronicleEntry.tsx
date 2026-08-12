import Image from 'next/image';
import { RevealOnScroll } from '@/shared/ui/RevealOnScroll';
import { formatCampaignDay } from '../../lib/formatCampaignDay';
import type { ChronicleEntryProps } from './types';
import styles from './ChronicleEntry.module.scss';

export function ChronicleEntry({ entry }: ChronicleEntryProps) {
  return (
    <li className={styles.item}>
      <RevealOnScroll as="span" className={styles.marker} x={0} />

      <RevealOnScroll className={styles.content} delay={0.08}>
        <article>
          <div className={styles.meta}>
            <span className={styles.author}>{entry.author}</span>
            <span className={styles.dot} aria-hidden />
            <time className={styles.date} dateTime={entry.publishedAt}>
              {entry.era} · День {formatCampaignDay(entry.campaignDay)}
            </time>
          </div>

          <h2 className={styles.title}>{entry.title}</h2>

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
      </RevealOnScroll>
    </li>
  );
}
