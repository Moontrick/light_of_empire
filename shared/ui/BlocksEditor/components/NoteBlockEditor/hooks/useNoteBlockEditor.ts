import type { NoteBlockEditorProps } from '../types';

// пустые поля не сохраняются в блок — см. Task 11 Step 3 (чистка секции при сохранении)
export function useNoteBlockEditor({ value, onChange }: NoteBlockEditorProps) {
  const title = value.title ?? '';
  const text = value.text ?? '';
  const items = value.items ?? [];

  const emit = (next: { title: string; text: string; items: string[] }) =>
    onChange({
      kind: 'note',
      ...(next.title ? { title: next.title } : {}),
      ...(next.text ? { text: next.text } : {}),
      ...(next.items.length ? { items: next.items } : {}),
    });

  const setTitle = (nextTitle: string) => emit({ title: nextTitle, text, items });
  const setText = (nextText: string) => emit({ title, text: nextText, items });
  const setItems = (nextItems: string[]) => emit({ title, text, items: nextItems });

  return { title, text, items, setTitle, setText, setItems };
}
