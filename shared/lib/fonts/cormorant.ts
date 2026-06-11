import localFont from 'next/font/local';

// Единый шрифт проекта — Cormorant Garamond (вариативный: все веса 300–700 + italic
// в двух файлах). Self-host через next/font/local, файлы лежат в public/fonts.
export const cormorant = localFont({
  src: [
    {
      path: '../../../public/fonts/CormorantGaramond-VariableFont_wght.ttf',
      weight: '300 700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/CormorantGaramond-Italic-VariableFont_wght.ttf',
      weight: '300 700',
      style: 'italic',
    },
  ],
  variable: '--font-cormorant',
  display: 'swap',
  // У Cormorant маленькая x-высота — на прежних размерах текст выглядит мельче,
  // чем Manrope/GolosText. size-adjust равномерно укрупняет глифы без правки шкалы.
  declarations: [{ prop: 'size-adjust', value: '112%' }],
});
