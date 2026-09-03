'use client';

import { Button, Collapse, ConfigProvider, Input, Skeleton } from 'antd';
import { DARK_FORM_THEME } from '@utils/antdTheme';
import { HudCard } from '@ui/HudCard';
import { NewsBlocksEditor } from '@ui/NewsBlocksEditor';
import { NewsStatus } from '@/shared/types';
import { CoverPicker } from './components/CoverPicker';
import { DiscordPanel } from './components/DiscordPanel';
import { useNewsEditor } from './hooks/useNewsEditor';
import type { NewsEditorProps } from './types';
import styles from './NewsEditor.module.scss';

export function NewsEditor({ slug }: NewsEditorProps) {
  const {
    title, setTitle, tag, setTag, excerpt, setExcerpt,
    customSlug, setCustomSlug, lead, setLead, blocks, setBlocks,
    coverPreviewUrl, coverProcessing, pickCover, clearCover,
    editable, loading, notFound,
    saving, canSave, save, goBack,
    draftButtonLabel, publishButtonLabel,
    canSendToDiscord, isSendToDiscord, discordMutating,
    sendEditableToDiscord, cancelEditableDiscordSend,
  } = useNewsEditor(slug);

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <HudCard title={editable ? 'Редактирование новости' : 'Новая новость'}>
        {loading && <Skeleton active paragraph={{ rows: 8 }} />}

        {!loading && notFound && (
          <div className={styles.notFound}>
            <p>Новость не найдена</p>
            <Button onClick={goBack}>К списку</Button>
          </div>
        )}

        {!loading && !notFound && (
          <div className={styles.form}>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Заголовок"
              size="large"
            />
            <Input
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              placeholder="Рубрика (например, Анонс)"
            />
            <Input.TextArea
              value={excerpt}
              onChange={(event) => setExcerpt(event.target.value)}
              placeholder="Выжимка для карточки (excerpt)"
              autoSize={{ minRows: 2 }}
            />
            <Input.TextArea
              value={lead}
              onChange={(event) => setLead(event.target.value)}
              placeholder="Вводный абзац (lead, необязательно)"
              autoSize={{ minRows: 2 }}
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
