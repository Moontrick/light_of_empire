// Общие поля ссылки для CharterBlock (kind: 'link') и NewsBlock (type: 'link'):
// редактор не знает о дискриминаторе, его подставляет вызывающий
export interface LinkFields {
  url: string;
  text?: string;
}

export interface LinkBlockEditorProps {
  value: LinkFields;
  onChange: (fields: LinkFields) => void;
}
