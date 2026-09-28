import { useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import {
  colorMarkers,
  MARKS,
  toggleWrap,
  type MarkupColor,
} from '@/shared/utils/charterMarkup';

const HOTKEY_MARKS: Record<string, keyof typeof MARKS> = {
  b: 'bold',
  i: 'italic',
  u: 'underline',
};

export function useRichTextInput(value: string, onChange: (value: string) => void) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasFocusedRef = useRef(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Высота по содержимому: сбрасываем в auto, чтобы scrollHeight учёл и удалённые строки;
  // rows у textarea задаёт минимум. В скрытом контейнере scrollHeight равен 0 — оставляем auto
  const fitHeight = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    if (el.scrollHeight > 0) el.style.height = `${el.scrollHeight}px`;
  };

  useLayoutEffect(fitHeight, [value]);

  const handleTextareaFocus = () => {
    hasFocusedRef.current = true;
    fitHeight();
  };

  // mousedown по кнопке тулбара не должен красть фокус и выделение у textarea
  const keepSelection = (event: MouseEvent) => {
    event.preventDefault();
  };

  const applyMarkers = (open: string, close: string) => {
    const el = textareaRef.current;
    if (!el) return;
    // Пока поле ни разу не фокусировалось, selectionStart/End равны 0 —
    // в этом случае добавляем маркеры в конец текста, а не в начало
    const start = hasFocusedRef.current ? el.selectionStart : value.length;
    const end = hasFocusedRef.current ? el.selectionEnd : value.length;
    const result = toggleWrap(value, start, end, open, close);
    onChange(result.text);
    // Вернуть фокус и выделение после ре-рендера controlled-значения
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  };

  const applyMark = (mark: keyof typeof MARKS) => {
    const [open, close] = MARKS[mark];
    applyMarkers(open, close);
  };

  const applyColor = (color: MarkupColor) => {
    const [open, close] = colorMarkers(color);
    applyMarkers(open, close);
  };

  // Ctrl/Cmd+B/I/U — как в привычных редакторах; Enter остаётся переносом строки
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
    const mark = HOTKEY_MARKS[event.key.toLowerCase()];
    if (!mark) return;
    event.preventDefault();
    applyMark(mark);
  };

  const togglePreview = () => setPreviewOpen((open) => !open);

  return {
    textareaRef,
    handleTextareaFocus,
    keepSelection,
    applyMark,
    applyColor,
    handleKeyDown,
    previewOpen,
    togglePreview,
  };
}
