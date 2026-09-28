import { RichTextInput } from '@ui/RichTextInput';
import type { ParagraphBlockEditorProps } from './types';

export function ParagraphBlockEditor({ value, onChange }: ParagraphBlockEditorProps) {
  return (
    <RichTextInput
      value={value.text}
      onChange={(text) => onChange({ ...value, text })}
      placeholder="Текст абзаца"
    />
  );
}
