'use client';

import { Button, ConfigProvider, Input, Select, Skeleton } from 'antd';
import { FORM_THEME } from '@utils/antdTheme';
import { FORUM_EDITOR_KINDS, FORUM_THREAD_IMAGES_MAX, FORUM_THREAD_TAGS_MAX, FORUM_THREAD_TITLE_MAX } from '@/shared/constants';
import { BlocksEditor } from '@ui/BlocksEditor';
import { HudCard } from '@ui/HudCard';
import { useForumThreadEditor } from './hooks/useForumThreadEditor';
import type { ForumThreadEditorProps } from './types';
import styles from './ForumThreadEditor.module.scss';

export function ForumThreadEditor({ threadId }: ForumThreadEditorProps) {
  const {
    editing, title, setTitle, titleError,
    categoryId, setCategoryId, categoryOptions,
    tagIds, setTagIds, tagOptions,
    blocks, setBlocks, imagesCount, imagesError,
    loading, notFound, loadError, retry, saving, canSave, save, cancel,
  } = useForumThreadEditor(threadId);

  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <ConfigProvider theme={FORM_THEME}>
          <HudCard title={editing ? 'Редактирование темы' : 'Новая тема'}>
            {loading && <Skeleton active paragraph={{ rows: 8 }} />}

            {!loading && notFound && (
              <div className={styles.notFound}>
                <p>Тема не найдена</p>
                <Button onClick={cancel}>К форуму</Button>
              </div>
            )}

            {!loading && loadError && (
              <div className={styles.notFound}>
                <p>Не удалось загрузить тему</p>
                <Button onClick={() => void retry()}>Повторить</Button>
                <Button onClick={cancel}>К форуму</Button>
              </div>
            )}

            {!loading && !notFound && !loadError && (
              <div className={styles.form}>
                <div className={styles.field}>
                  <Input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Заголовок темы"
                    aria-label="Заголовок темы"
                    size="large"
                    maxLength={FORUM_THREAD_TITLE_MAX}
                    status={titleError ? 'error' : undefined}
                  />
                  {titleError && <span className={styles.error}>{titleError}</span>}
                </div>

                {!editing && (
                  <>
                    <Select
                      value={categoryId}
                      onChange={setCategoryId}
                      placeholder="Раздел"
                      aria-label="Раздел"
                      options={categoryOptions}
                      size="large"
                    />
                    <Select
                      mode="multiple"
                      value={tagIds}
                      onChange={setTagIds}
                      placeholder="Теги (необязательно)"
                      aria-label="Теги"
                      maxCount={FORUM_THREAD_TAGS_MAX}
                      options={tagOptions}
                    />
                  </>
                )}

                <div className={styles.field}>
                  <BlocksEditor value={blocks} onChange={setBlocks} allowedKinds={FORUM_EDITOR_KINDS} />
                  <span className={imagesError ? styles.error : styles.hint}>
                    {imagesError ?? `Картинок: ${imagesCount} из ${FORUM_THREAD_IMAGES_MAX}`}
                  </span>
                </div>

                <div className={styles.actions}>
                  <Button type="primary" onClick={() => void save()} loading={saving} disabled={!canSave || saving}>
                    {editing ? 'Сохранить' : 'Создать тему'}
                  </Button>
                  <Button onClick={cancel} disabled={saving}>
                    Отмена
                  </Button>
                </div>
              </div>
            )}
          </HudCard>
        </ConfigProvider>
      </div>
    </main>
  );
}
