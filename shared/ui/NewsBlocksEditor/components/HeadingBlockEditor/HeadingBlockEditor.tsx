import { Input } from 'antd';
import type { HeadingBlockEditorProps } from './types';

export function HeadingBlockEditor({ value, onChange }: HeadingBlockEditorProps) {
  return (
    <Input
      value={value.text}
      onChange={(event) => onChange({ ...value, text: event.target.value })}
      placeholder="Текст подзаголовка"
    />
  );
}
