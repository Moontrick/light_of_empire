'use client';

import { Button, Empty, Skeleton } from 'antd';
import { TagCard } from './components/TagCard';
import { TagFormModal } from './components/TagFormModal';
import { useTagsTab } from './hooks/useTagsTab';
import styles from './TagsTab.module.scss';

export function TagsTab() {
  const {
    tags, loading, loadError, retry, mutating,
    editing, openCreate, openEdit, closeEdit, remove,
  } = useTagsTab();

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Button type="primary" onClick={openCreate} disabled={mutating}>
          Добавить тег
        </Button>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : loadError ? (
        <Empty description="Не удалось загрузить теги">
          <Button onClick={() => void retry()}>Повторить</Button>
        </Empty>
      ) : tags.length === 0 ? (
        <Empty description="Тегов пока нет" />
      ) : (
        <div className={styles.list}>
          {tags.map((tag) => (
            <TagCard
              key={tag.id}
              tag={tag}
              disabled={mutating}
              onEdit={() => openEdit(tag)}
              onDelete={() => void remove(tag)}
            />
          ))}
        </div>
      )}

      <TagFormModal editing={editing} onClose={closeEdit} />
    </div>
  );
}
