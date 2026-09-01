import classNames from 'classnames';
import { parseInlineStyles } from '@/shared/utils/parseInlineStyles';
import type { DirectoryTagProps } from './types';
import styles from './DirectoryTag.module.scss';

export function DirectoryTag({ entry, size = 'md' }: DirectoryTagProps) {
  const accent = entry.color || undefined;

  return (
    <span
      className={classNames(styles.tag, { [styles.lg]: size === 'lg' })}
      style={{
        ...(accent && {
          color: accent,
          borderColor: accent,
          background: `color-mix(in srgb, ${accent} 12%, transparent)`,
        }),
        ...parseInlineStyles(entry.styles),
      }}
    >
      {entry.name}
    </span>
  );
}
