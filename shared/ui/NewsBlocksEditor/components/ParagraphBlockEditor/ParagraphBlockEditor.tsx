import { Input } from 'antd';
import type { ParagraphBlockEditorProps } from './types';

const { TextArea } = Input;

export function ParagraphBlockEditor({ value, onChange }: ParagraphBlockEditorProps) {
  return (
    <TextArea
      value={value.text}
      onChange={(event) => onChange({ ...value, text: event.target.value })}
      placeholder="Текст абзаца"
      autoSize={{ minRows: 3 }}
    />
  );
}
