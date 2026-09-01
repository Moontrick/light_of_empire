import { theme, type ThemeConfig } from 'antd';

// ConfigProvider вычисляет производные цвета алгоритмом и не умеет
// css-переменные, поэтому здесь литералы из палитры --uv-* (_variables.scss).
export const DARK_FORM_THEME: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#d22730',
    colorBgBase: '#212121',
    colorBgContainer: '#2a2a2a',
    colorBorder: 'rgba(255, 255, 255, 0.12)',
    colorError: '#e54b4b',
    borderRadius: 0,
    controlHeight: 44,
    fontFamily: 'var(--ls-font)',
    fontSize: 16,
  },
};
