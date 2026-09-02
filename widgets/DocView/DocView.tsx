'use client';

import { Button, ConfigProvider } from 'antd';
import { DARK_FORM_THEME } from '@/shared/lib/antdTheme';
import { DocHero } from './components/DocHero';
import { DocBody } from './components/DocBody';
import { DocFooter } from './components/DocFooter';
import { EditModeBar } from './components/EditModeBar';
import { WrapperFormModal } from './components/WrapperFormModal';
import { EditableSection } from './components/EditableSection';
import { SectionEditor } from './components/SectionEditor';
import { SectionToolbar } from './components/SectionToolbar';
import { useDocView } from './hooks/useDocView';
import type { DocViewProps } from './types';
import styles from './DocView.module.scss';

export function DocView({ doc, canEdit, banner, afterHero }: DocViewProps) {
  const {
    editMode,
    toggleEditMode,
    wrapperOpen,
    openWrapper,
    closeWrapper,
    editingSectionSlug,
    startEditSection,
    stopEditSection,
    addingSection,
    startAddSection,
    stopAddSection,
  } = useDocView();

  return (
    <div className={styles.root}>
      {banner}
      <DocHero eyebrow={doc.hero.eyebrow} title={doc.hero.title} intro={doc.hero.intro} />
      {afterHero}
      <main className={styles.content}>
        <DocBody
          sections={doc.sections}
          searchPlaceholder={doc.searchPlaceholder}
          pinnedSlug={editMode ? editingSectionSlug : undefined}
          renderSection={
            editMode
              ? (section) => {
                const docSection = doc.sections.find((item) => item.slug === section.slug);
                if (!docSection) return null;
                return (
                  <EditableSection
                    section={docSection}
                    editing={editingSectionSlug === docSection.slug}
                    onEdit={() => startEditSection(docSection.slug)}
                    onClose={stopEditSection}
                    toolbar={<SectionToolbar section={docSection} sections={doc.sections} />}
                  />
                );
              }
              : undefined
          }
        />
        {editMode && (
          <ConfigProvider theme={DARK_FORM_THEME}>
            {addingSection ? (
              <SectionEditor section={null} onClose={stopAddSection} />
            ) : (
              <Button className={styles.addSection} onClick={startAddSection}>
                + Добавить секцию
              </Button>
            )}
          </ConfigProvider>
        )}
      </main>
      <DocFooter text={doc.footer} />
      {canEdit && (
        <>
          <EditModeBar editMode={editMode} onToggle={toggleEditMode} onEditWrapper={openWrapper} />
          <WrapperFormModal open={wrapperOpen} onClose={closeWrapper} initial={doc} />
        </>
      )}
    </div>
  );
}
