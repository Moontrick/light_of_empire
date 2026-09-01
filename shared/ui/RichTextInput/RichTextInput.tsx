'use client';

import { Button, Dropdown, Tooltip } from 'antd';
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
  rows = 4,
}: RichTextInputProps) {
  const { textareaRef, handleTextareaFocus, keepSelection, applyMark, applyColor } = useRichTextInput(value, onChange);

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Tooltip title="Жирный">
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
        <Tooltip title="Курсив">
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
        <Tooltip title="Подчёркнутый">
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
      </div>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={handleTextareaFocus}
        placeholder={placeholder}
        rows={rows}
      />
      {value.trim() && (
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
