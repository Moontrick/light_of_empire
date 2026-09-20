'use client';

import { Button, Collapse, ConfigProvider, Input, Skeleton } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { NewsBlocksEditor } from '@ui/NewsBlocksEditor';
import { CoverPicker } from '@ui/CoverPicker';
import { DiscordPanel } from '@ui/DiscordPanel';
import { NewsStatus } from '@/shared/types';
import { useCombatOperationEditor } from './hooks/useCombatOperationEditor';
import type { CombatOperationEditorProps } from './types';
import styles from './CombatOperationEditor.module.scss';

export function CombatOperationEditor({ slug }: CombatOperationEditorProps) {
  const {
    title, setTitle, tag, setTag,
    customSlug, setCustomSlug, blocks, setBlocks,
    coverPreviewUrl, coverProcessing, pickCover, clearCover,
    editable, loading, notFound, loadError, retry,
    saving, canSave, save, goBack,
    draftButtonLabel, publishButtonLabel,
    canSendToDiscord, isSendToDiscord, discordMutating,
    sendEditableToDiscord, cancelEditableDiscordSend,
  } = useCombatOperationEditor(slug);

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard title={editable ? 'Редактирование операции' : 'Новая операция'}>
        {loading && <Skeleton active paragraph={{ rows: 8 }} />}

        {!loading && notFound && (
          <div className={styles.notFound}>
            <p>Операция не найдена</p>
            <Button onClick={goBack}>К списку</Button>
          </div>
        )}

        {!loading && loadError && (
          <div className={styles.notFound}>
            <p>Не удалось загрузить операцию</p>
            <Button onClick={retry}>Повторить</Button>
            <Button onClick={goBack}>К списку</Button>
          </div>
        )}

        {!loading && !notFound && !loadError && (
          <div className={styles.form}>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Название операции"
              size="large"
            />
            <Input
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              placeholder="Рубрика (например, Штурм)"
            />

            <Collapse
              ghost
              items={[
                {
                  key: 'advanced',
                  label: 'Дополнительно',
                  children: (
                    <Input
                      value={customSlug}
                      onChange={(event) => setCustomSlug(event.target.value)}
                      placeholder="Slug (латиницей). Пусто — создастся сам"
                    />
                  ),
                },
              ]}
            />

            <CoverPicker
              previewUrl={coverPreviewUrl}
              processing={coverProcessing}
              onPick={pickCover}
              onClear={clearCover}
            />

            <NewsBlocksEditor value={blocks} onChange={setBlocks} />

            {canSendToDiscord && (
              <DiscordPanel
                sent={isSendToDiscord}
                loading={discordMutating}
                disabled={saving}
                onSend={() => void sendEditableToDiscord()}
                onCancel={() => void cancelEditableDiscordSend()}
              />
            )}

            <div className={styles.actions}>
              <Button onClick={() => void save(NewsStatus.DRAFT)} loading={saving} disabled={!canSave || saving}>
                {draftButtonLabel}
              </Button>
              <Button
                type="primary"
                onClick={() => void save(NewsStatus.PUBLISHED)}
                loading={saving}
                disabled={!canSave || saving}
              >
                {publishButtonLabel}
              </Button>
              <Button onClick={goBack} disabled={saving}>
                Отмена
              </Button>
            </div>
          </div>
        )}
      </HudCard>
    </ConfigProvider>
  );
}
