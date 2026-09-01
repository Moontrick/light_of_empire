import { Flex, Input } from 'antd';
import type { QuoteBlockEditorProps } from './types';

const { TextArea } = Input;

export function QuoteBlockEditor({ value, onChange }: QuoteBlockEditorProps) {
  return (
    <Flex vertical gap="small">
      <TextArea
        value={value.text}
        onChange={(event) => onChange({ ...value, text: event.target.value })}
        placeholder="Текст цитаты"
        autoSize={{ minRows: 2 }}
      />
      <Input
        value={value.author ?? ''}
        onChange={(event) => onChange({ ...value, author: event.target.value || undefined })}
        placeholder="Автор (необязательно)"
      />
    </Flex>
  );
}
