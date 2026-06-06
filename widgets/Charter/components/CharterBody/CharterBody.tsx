'use client';

import { useMemo, useState } from 'react';
import { CharterToc } from '../CharterToc';
import { CharterSection } from '../CharterSection';
import type { CharterBlock, CharterSectionData } from '../../types';
import type { CharterBodyProps } from './types';
import styles from './CharterBody.module.scss';

function blockText(block: CharterBlock): string {
  switch (block.kind) {
    case 'text':
    case 'subheading':
      return block.text;
    case 'list':
      return block.items.join(' ');
    case 'note':
      return [block.title ?? '', block.text ?? '', ...(block.items ?? [])].join(' ');
    default:
      return '';
  }
}

function sectionMatches(section: CharterSectionData, query: string): boolean {
  if (!query) return true;
  const haystack = [section.title, ...section.blocks.map(blockText)]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

export function CharterBody({ sections }: CharterBodyProps) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();

  const visible = useMemo(
    () => sections.filter((section) => sectionMatches(section, normalized)),
    [sections, normalized],
  );

  return (
    <div className={styles.body}>
      <div className={styles.searchWrap}>
        <span className={styles.icon} aria-hidden>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path
              d="m20 20-3.2-3.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Поиск по уставу…"
          className={styles.input}
          aria-label="Поиск по уставу"
        />
        {query && (
          <button
            type="button"
            className={styles.clear}
            onClick={() => setQuery('')}
            aria-label="Очистить"
          >
            ×
          </button>
        )}
      </div>

      {visible.length > 0 && (
        <CharterToc
          sections={visible.map((section) => ({ id: section.id, title: section.title }))}
        />
      )}

      {visible.length === 0 ? (
        <p className={styles.empty}>Ничего не найдено по запросу «{query}».</p>
      ) : (
        visible.map((section) => <CharterSection key={section.id} section={section} />)
      )}
    </div>
  );
}
