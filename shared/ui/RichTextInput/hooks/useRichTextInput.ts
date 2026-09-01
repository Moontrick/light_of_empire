import { useRef } from 'react';
import type { MouseEvent } from 'react';
import {
  colorMarkers,
  MARKS,
  toggleWrap,
  type MarkupColor,
} from '@/shared/utils/charterMarkup';

export function useRichTextInput(value: string, onChange: (value: string) => void) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasFocusedRef = useRef(false);

  const handleTextareaFocus = () => {
    hasFocusedRef.current = true;
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

  return { textareaRef, handleTextareaFocus, keepSelection, applyMark, applyColor };
}
