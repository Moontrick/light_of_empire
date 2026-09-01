import { RichTextInput } from '@ui/RichTextInput';
import type { TextBlockEditorProps } from './types';

export function TextBlockEditor({ value, onChange }: TextBlockEditorProps) {
  return (
    <RichTextInput
      value={value.text}
      onChange={(text) => onChange({ ...value, text })}
      placeholder="Текст абзаца"
    />
  );
}
