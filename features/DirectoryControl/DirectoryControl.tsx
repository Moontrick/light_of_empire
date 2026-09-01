'use client';

import { Button, ConfigProvider } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { DIRECTORY_CONFIGS } from './constants';
import { DirectoryList } from './components/DirectoryList';
import { EditDirectoryModal } from './components/EditDirectoryModal';
import { useDirectoryControl } from './hooks/useDirectoryControl';
import type { DirectoryControlProps } from './types';

export function DirectoryControl({ kind }: DirectoryControlProps) {
  const config = DIRECTORY_CONFIGS[kind];
  const {
    canManage,
    entries,
    loading,
    editing,
    deletingId,
    openCreate,
    openEdit,
    closeEdit,
    reload,
    deleteEntry,
  } = useDirectoryControl(config);

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard
        title={config.title}
        extra={
          canManage ? (
            <Button type="primary" onClick={openCreate}>
              Добавить
            </Button>
          ) : undefined
        }
      >
        <DirectoryList
          entries={entries}
          loading={loading}
          canManage={canManage}
          deletingId={deletingId}
          emptyText={config.labels.emptyList}
          deleteConfirm={config.labels.deleteConfirm}
          deleteWarning={config.labels.deleteWarning}
          onEdit={openEdit}
          onDelete={deleteEntry}
        />
      </HudCard>
      <EditDirectoryModal
        config={config}
        editing={editing}
        onClose={closeEdit}
        onSaved={reload}
      />
    </ConfigProvider>
  );
}
