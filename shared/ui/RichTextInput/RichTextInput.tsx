'use client';

import { Button, Dropdown, Tooltip } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { MARKUP_COLORS } from '@/shared/utils/charterMarkup';
import { RichText } from '@ui/RichText';
import { COLOR_LABELS } from './constants';
import { useRichTextInput } from './hooks/useRichTextInput';
import type { RichTextInputProps } from './types';
import styles from './RichTextInput.module.scss';

export function RichTextInput({
  value = '',
  onChange = () => {},
  placeholder,
  rows = 3,
}: RichTextInputProps) {
  const {
    textareaRef,
    handleTextareaFocus,
    keepSelection,
    applyMark,
    applyColor,
    handleKeyDown,
    previewOpen,
    togglePreview,
  } = useRichTextInput(value, onChange);

  const showPreview = previewOpen && value.trim().length > 0;

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Tooltip title="Жирный (Ctrl+B)">
          <Button
            size="small"
            onClick={() => applyMark('bold')}
            onMouseDown={keepSelection}
            aria-label="Жирный"
            className={styles.bold}
          >
            Ж
          </Button>
        </Tooltip>
        <Tooltip title="Курсив (Ctrl+I)">
          <Button
            size="small"
            onClick={() => applyMark('italic')}
            onMouseDown={keepSelection}
            aria-label="Курсив"
            className={styles.italic}
          >
            К
          </Button>
        </Tooltip>
        <Tooltip title="Подчёркнутый (Ctrl+U)">
          <Button
            size="small"
            onClick={() => applyMark('underline')}
            onMouseDown={keepSelection}
            aria-label="Подчёркнутый"
            className={styles.underlined}
          >
            Ч
          </Button>
        </Tooltip>
        <Dropdown
          trigger={['click']}
          menu={{
            items: MARKUP_COLORS.map((color) => ({
              key: color,
              label: <span className={styles[color]}>{COLOR_LABELS[color]}</span>,
              onClick: () => applyColor(color),
            })),
          }}
        >
          <Button size="small" onMouseDown={keepSelection}>
            Цвет
          </Button>
        </Dropdown>
        <Tooltip title={previewOpen ? 'Скрыть предпросмотр' : 'Показать предпросмотр'}>
          <Button
            size="small"
            type={previewOpen ? 'primary' : 'default'}
            icon={previewOpen ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            onClick={togglePreview}
            aria-label="Предпросмотр"
            aria-pressed={previewOpen}
            className={styles.previewToggle}
          />
        </Tooltip>
      </div>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={handleTextareaFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={rows}
      />
      {showPreview && (
        <div className={styles.preview}>
          <span className={styles.previewLabel}>Предпросмотр</span>
          <div className={styles.previewBody}>
            <RichText text={value} />
          </div>
        </div>
      )}
    </div>
  );
}
