'use client';

import { Button, ConfigProvider, Skeleton } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { PageFormModal } from './components/PageFormModal';
import { StructureTree } from './components/StructureTree';
import { useStructureControl } from './hooks/useStructureControl';
import styles from './StructureControl.module.scss';

export function StructureControl() {
  const {
    tree,
    treeStatus,
    savingTree,
    canMutate,
    modal,
    openCreate,
    openEdit,
    closeModal,
    changeStatus,
    remove,
    move,
    fetchTree,
  } = useStructureControl();

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard
        title="Структура"
        extra={
          canMutate ? (
            <Button type="primary" onClick={openCreate}>
              Создать страницу
            </Button>
          ) : undefined
        }
      >
        {treeStatus === 'idle' || treeStatus === 'loading' ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : treeStatus === 'error' ? (
          <div className={styles.error}>
            <p>Не удалось загрузить структуру.</p>
            <Button onClick={() => void fetchTree()}>Повторить</Button>
          </div>
        ) : tree.length === 0 ? (
          <p className={styles.empty}>Страниц пока нет.</p>
        ) : (
          <StructureTree
            nodes={tree}
            canMutate={canMutate}
            savingTree={savingTree}
            onEdit={openEdit}
            onChangeStatus={changeStatus}
            onDelete={remove}
            onMove={move}
          />
        )}
      </HudCard>
      <PageFormModal open={modal.open} node={modal.node} onClose={closeModal} />
    </ConfigProvider>
  );
}
