import { theme, type ThemeConfig } from 'antd';

// Use project CSS variables so forms automatically follow the current BF light/dark mode.
// Ant Design can consume CSS variable values directly; they update with data-theme/data-mode.
export const FORM_THEME: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: 'var(--bf-panel)',
    colorInfo: 'var(--bf-panel)',
    colorLink: 'var(--bf-link)',
    colorBgBase: 'var(--bf-bg)',
    colorBgContainer: 'var(--bf-tile)',
    colorBgElevated: 'var(--bf-tile)',
    colorBgLayout: 'var(--bf-bg)',
    colorBorder: 'var(--bf-line-strong)',
    colorBorderSecondary: 'var(--bf-line)',
    colorText: 'var(--bf-text)',
    colorTextSecondary: 'var(--bf-text-muted)',
    colorTextTertiary: 'var(--bf-text-faint)',
    colorError: 'var(--bf-yellow)',
    colorWarning: 'var(--bf-yellow-deep)',
    colorSuccess: 'var(--bf-success)',
    borderRadius: 0,
    controlHeight: 44,
    fontFamily: 'var(--ls-font)',
    fontSize: 16,
  },
  components: {
    Button: {
      primaryColor: 'var(--bf-text-on-panel)',
      primaryShadow: 'none',
      defaultShadow: 'none',
      defaultBg: 'var(--bf-tile)',
      defaultBorderColor: 'transparent',
      defaultHoverBg: 'var(--bf-tile-hover)',
      defaultHoverBorderColor: 'var(--bf-yellow)',
      defaultHoverColor: 'var(--bf-text)',
      defaultColor: 'var(--bf-text)',
      fontWeight: 600,
    },
    Input: {
      activeBorderColor: 'var(--bf-yellow)',
      hoverBorderColor: 'var(--bf-panel)',
      activeShadow: 'none',
      colorBgContainer: 'var(--bf-tile)',
      colorText: 'var(--bf-text)',
      colorTextPlaceholder: 'var(--bf-text-faint)',
    },
    InputNumber: {
      activeBorderColor: 'var(--bf-yellow)',
      hoverBorderColor: 'var(--bf-panel)',
      activeShadow: 'none',
    },
    Select: {
      activeBorderColor: 'var(--bf-yellow)',
      hoverBorderColor: 'var(--bf-panel)',
      activeOutlineColor: 'transparent',
      colorBgContainer: 'var(--bf-tile)',
      colorText: 'var(--bf-text)',
      selectorBg: 'var(--bf-tile)',
    },
    Table: {
      headerBg: 'var(--bf-panel)',
      headerColor: 'var(--bf-text-on-panel)',
      headerSortActiveBg: 'var(--bf-panel-hover)',
      headerSortHoverBg: 'var(--bf-panel-hover)',
      rowHoverBg: 'var(--bf-tile-hover)',
      borderColor: 'var(--bf-line)',
    },
    Modal: {
      contentBg: 'var(--bf-bg)',
      headerBg: 'var(--bf-bg)',
    },
    Tabs: {
      inkBarColor: 'var(--bf-yellow)',
      itemSelectedColor: 'var(--bf-text)',
      itemHoverColor: 'var(--bf-text)',
    },
    Switch: {
      colorPrimary: 'var(--bf-panel)',
      colorPrimaryHover: 'var(--bf-panel-hover)',
    },
  },
};
