export interface RichTextInputProps {
  // Опциональны, чтобы компонент оставался типобезопасным при использовании
  // напрямую внутри antd Form.Item, который сам пробрасывает value/onChange
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  // Минимальная высота в строках; дальше поле растёт по содержимому
  rows?: number;
}
