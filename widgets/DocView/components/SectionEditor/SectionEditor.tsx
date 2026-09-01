'use client';

import { Button, Collapse, ConfigProvider, Input } from 'antd';
import { DARK_FORM_THEME } from '@/shared/lib/antdTheme';
import { BlocksEditor } from '@ui/BlocksEditor';
import { useSectionEditor } from './hooks/useSectionEditor';
import type { SectionEditorProps } from './types';
import styles from './SectionEditor.module.scss';

export function SectionEditor({ section, onClose }: SectionEditorProps) {
  const { title, setTitle, slug, setSlug, blocks, setBlocks, saving, canSave, save } =
    useSectionEditor(section, onClose);

  return (
    <ConfigProvider theme={DARK_FORM_THEME}>
      <section className={styles.editor}>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Заголовок секции"
          size="large"
        />
        <Collapse
          ghost
          items={[
            {
              key: 'advanced',
              label: 'Дополнительно',
              children: (
                <Input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="Якорь (латиницей, например golden-rules). Пусто — создастся сам"
                />
              ),
            },
          ]}
        />
        <BlocksEditor value={blocks} onChange={setBlocks} />
        <div className={styles.actions}>
          <Button type="primary" onClick={() => void save()} loading={saving} disabled={!canSave}>
            Сохранить
          </Button>
          <Button onClick={onClose} disabled={saving}>
            Отмена
          </Button>
        </div>
      </section>
    </ConfigProvider>
  );
}
