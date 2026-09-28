import { Flex, Input } from 'antd';
import { RichTextInput } from '@ui/RichTextInput';
import type { QuoteBlockEditorProps } from './types';

export function QuoteBlockEditor({ value, onChange }: QuoteBlockEditorProps) {
  return (
    <Flex vertical gap="small">
      <RichTextInput
        value={value.text}
        onChange={(text) => onChange({ ...value, text })}
        placeholder="Текст цитаты"
        rows={3}
      />
      <Input
        value={value.author ?? ''}
        onChange={(event) => onChange({ ...value, author: event.target.value || undefined })}
        placeholder="Автор (необязательно)"
      />
    </Flex>
  );
}
