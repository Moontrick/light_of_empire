import { Input } from 'antd';
import type { SubheadingBlockEditorProps } from './types';

export function SubheadingBlockEditor({ value, onChange }: SubheadingBlockEditorProps) {
  return (
    <Input
      value={value.text}
      onChange={(event) => onChange({ ...value, text: event.target.value })}
      placeholder="Текст подзаголовка"
    />
  );
}
