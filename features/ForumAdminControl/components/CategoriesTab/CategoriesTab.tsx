'use client';

import { Button, Empty, Skeleton } from 'antd';
import { CategoryCard } from './components/CategoryCard';
import { CategoryFormModal } from './components/CategoryFormModal';
import { useCategoriesTab } from './hooks/useCategoriesTab';
import styles from './CategoriesTab.module.scss';

export function CategoriesTab() {
  const {
    categories, loading, loadError, retry, mutating, openCreate,
    openEdit, moveUp, moveDown, toggleArchive, remove,
    editing, closeEdit,
  } = useCategoriesTab();

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Button type="primary" onClick={openCreate} disabled={mutating}>
          Добавить раздел
        </Button>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : loadError ? (
        <Empty description="Не удалось загрузить разделы">
          <Button onClick={() => void retry()}>Повторить</Button>
        </Empty>
      ) : categories.length === 0 ? (
        <Empty description="Разделов пока нет" />
      ) : (
        <div className={styles.list}>
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              canMoveUp={index > 0}
              canMoveDown={index < categories.length - 1}
              disabled={mutating}
              onMoveUp={() => void moveUp(index)}
              onMoveDown={() => void moveDown(index)}
              onEdit={() => openEdit(category)}
              onToggleArchive={() => void toggleArchive(category)}
              onDelete={() => void remove(category)}
            />
          ))}
        </div>
      )}

      <CategoryFormModal editing={editing} onClose={closeEdit} />
    </div>
  );
}
