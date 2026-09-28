'use client';

import { ConfigProvider, Input, Segmented, Select } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { FORUM_SORT_OPTIONS } from '@/shared/constants';
import type { ForumThreadSort } from '@/shared/types';
import type { ThreadsToolbarProps } from './types';
import styles from './ThreadsToolbar.module.scss';

export function ThreadsToolbar({
  search, onSearchChange, tags, tag, onTagChange, sort, onSortChange,
}: ThreadsToolbarProps) {
  return (
    <ConfigProvider theme={FORM_THEME}>
      <div className={styles.root}>
        <Input.Search
          allowClear
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Поиск по заголовку"
          aria-label="Поиск по заголовку"
          maxLength={100}
          className={styles.search}
        />
        <Select
          allowClear
          value={tag}
          onChange={(value) => onTagChange(value ?? undefined)}
          placeholder="Все теги"
          aria-label="Фильтр по тегу"
          options={tags.map((item) => ({ value: item.id, label: item.name }))}
          className={styles.tags}
        />
        <Segmented
          value={sort}
          onChange={(value) => onSortChange(value as ForumThreadSort)}
          options={FORUM_SORT_OPTIONS}
        />
      </div>
    </ConfigProvider>
  );
}
