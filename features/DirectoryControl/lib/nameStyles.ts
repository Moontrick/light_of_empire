import { NAME_STYLE_PRESETS } from '../constants';

export function composeNameStyles(presetKeys: string[]): string {
  return NAME_STYLE_PRESETS.filter((preset) => presetKeys.includes(preset.key))
    .map((preset) => preset.css)
    .join(';');
}

// Обратный разбор строки styles в ключи пресетов: пресет считается включённым,
// если все его декларации присутствуют в строке
export function parseNameStyles(styles: string | null | undefined): string[] {
  if (!styles) return [];

  const declarations = new Set(
    styles.split(';').map((declaration) => declaration.trim()).filter(Boolean),
  );

  return NAME_STYLE_PRESETS.filter((preset) =>
    preset.css.split(';').every((declaration) => declarations.has(declaration)),
  ).map((preset) => preset.key);
}
