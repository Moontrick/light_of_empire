import type { ForumTagChipProps } from './types';
import styles from './ForumTagChip.module.scss';

export function ForumTagChip({ tag }: ForumTagChipProps) {
  const accent = tag.color || undefined;

  return (
    <span
      className={styles.chip}
      style={
        accent
          ? {
            color: accent,
            borderColor: accent,
            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
          }
          : undefined
      }
    >
      {tag.name}
    </span>
  );
}
