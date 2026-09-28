// Значение antd ColorPicker: строка, объект Color или пустота после очистки
export interface ColorPickerValue {
  toHexString: () => string;
  cleared?: boolean;
}

export function toColorString(
  value: string | ColorPickerValue | null | undefined,
): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (value.cleared) return '';
  return value.toHexString();
}
