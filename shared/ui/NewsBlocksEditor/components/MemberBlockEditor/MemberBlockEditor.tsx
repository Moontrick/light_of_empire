import { Flex, Input } from 'antd';
import type { MemberBlockEditorProps } from './types';

export function MemberBlockEditor({ value, onChange }: MemberBlockEditorProps) {
  return (
    <Flex vertical gap="small">
      <Input
        value={value.name}
        onChange={(event) => onChange({ ...value, name: event.target.value })}
        placeholder="Имя"
      />
      <Input
        value={value.role}
        onChange={(event) => onChange({ ...value, role: event.target.value })}
        placeholder="Роль/должность"
      />
    </Flex>
  );
}
