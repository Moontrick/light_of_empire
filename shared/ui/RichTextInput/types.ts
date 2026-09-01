export interface RichTextInputProps {
  // Опциональны, чтобы компонент оставался типобезопасным при использовании
  // напрямую внутри antd Form.Item, который сам пробрасывает value/onChange
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
}
