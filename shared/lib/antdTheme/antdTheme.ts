import { theme, type ThemeConfig } from 'antd';

// ConfigProvider вычисляет производные цвета алгоритмом и не умеет
// css-переменные, поэтому здесь литералы из палитры --bf-* (_variables.scss).
// Battlefront: светлые поверхности, угольный primary, жёлтый только на фокусе.
export const FORM_THEME: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#2b2b2b',
    colorInfo: '#2b2b2b',
    colorLink: '#2a5697',
    colorBgBase: '#e9e9e9',
    colorBgContainer: '#f3f3f3',
    colorBgElevated: '#f3f3f3',
    colorBgLayout: '#e9e9e9',
    colorBorder: 'rgba(0, 0, 0, 0.22)',
    colorBorderSecondary: 'rgba(0, 0, 0, 0.12)',
    colorText: '#262626',
    colorTextSecondary: '#5a5a5a',
    colorTextTertiary: '#8c8c8c',
    colorError: '#c0392b',
    colorWarning: '#d99a0b',
    colorSuccess: '#3d8b4f',
    borderRadius: 0,
    controlHeight: 44,
    fontFamily: 'var(--ls-font)',
    fontSize: 16,
  },
  components: {
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      defaultBg: '#dcdcdc',
      defaultBorderColor: 'transparent',
      defaultHoverBg: '#d3d3d3',
      defaultHoverBorderColor: '#f2b41f',
      defaultHoverColor: '#262626',
      fontWeight: 600,
    },
    Input: {
      activeBorderColor: '#f2b41f',
      hoverBorderColor: '#2b2b2b',
      activeShadow: 'none',
    },
    InputNumber: {
      activeBorderColor: '#f2b41f',
      hoverBorderColor: '#2b2b2b',
      activeShadow: 'none',
    },
    Select: {
      activeBorderColor: '#f2b41f',
      hoverBorderColor: '#2b2b2b',
      activeOutlineColor: 'transparent',
    },
    Table: {
      headerBg: '#2b2b2b',
      headerColor: '#f2f2f2',
      headerSortActiveBg: '#1f1f1f',
      headerSortHoverBg: '#1f1f1f',
      rowHoverBg: '#dcdcdc',
      borderColor: 'rgba(0, 0, 0, 0.12)',
    },
    Modal: {
      contentBg: '#e9e9e9',
      headerBg: '#e9e9e9',
    },
    Tabs: {
      inkBarColor: '#f2b41f',
      itemSelectedColor: '#262626',
      itemHoverColor: '#262626',
    },
    Switch: {
      colorPrimary: '#2b2b2b',
      colorPrimaryHover: '#1f1f1f',
    },
  },
};
