'use client';

import { Fragment, useMemo, useState } from 'react';
import { DocToc } from '../DocToc';
import { DocSection } from '../DocSection';
import type { CharterBlock, CharterRule, CharterSectionData } from '@/shared/types';
import type { DocBodyProps } from './types';
import styles from './DocBody.module.scss';

function ruleText(rule: CharterRule): string {
  return [rule.code, rule.text, rule.penalty ?? '', ...(rule.children ?? []).map(ruleText)].join(
    ' ',
  );
}

function blockText(block: CharterBlock): string {
  switch (block.kind) {
  case 'text':
  case 'subheading':
    return block.text;
  case 'list':
    return block.items.join(' ');
  case 'note':
    return [block.title ?? '', block.text ?? '', ...(block.items ?? [])].join(' ');
  case 'rules':
    return block.items.map(ruleText).join(' ');
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

export function DocBody({ sections, searchPlaceholder, renderSection, pinnedSlug }: DocBodyProps) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const placeholder = searchPlaceholder ?? 'Поиск по документу…';

  const visible = useMemo(
    () =>
      sections.filter(
        (section) => section.slug === pinnedSlug || sectionMatches(section, normalized),
      ),
    [sections, normalized, pinnedSlug],
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
          placeholder={placeholder}
          className={styles.input}
          aria-label="Поиск по документу"
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
        <DocToc
          sections={visible.map((section) => ({ slug: section.slug, title: section.title }))}
        />
      )}

      {visible.length === 0 ? (
        <p className={styles.empty}>
          {normalized ? `Ничего не найдено по запросу «${query}».` : 'Разделы ещё не добавлены.'}
        </p>
      ) : (
        visible.map((section) =>
          renderSection ? (
            <Fragment key={section.slug}>{renderSection(section)}</Fragment>
          ) : (
            <DocSection key={section.slug} section={section} />
          ),
        )
      )}
    </div>
  );
}
