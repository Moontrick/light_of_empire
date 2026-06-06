import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import { Fragment, ReactNode } from 'react';
import styles from './Alert.module.scss';

type AlertStatus = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  status: AlertStatus;
  title: string;
  subTitle?: React.ReactNode;
  onClose?: () => void;
}

const STATUS_ICONS: Record<AlertStatus, string> = {
  info: '●',
  success: '✔',
  warning: '▲',
  error: '✖',
};

const SPAN_REGEX = /<span>([\s\S]*?)<\/span>/g;

function renderWithHighlights(text: string): ReactNode {
  if (!text.includes('<span>')) return text;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  SPAN_REGEX.lastIndex = 0;
  while ((match = SPAN_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    parts.push(<span key={key++} className={styles.highlight}>{match[1]}</span>);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }
  return parts;
}

export function Alert({ status, title, subTitle, onClose }: AlertProps) {
  return (
    <div className={clsx(styles.alert, styles[status])}>
      <div className={styles.bar} />

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.icon}>{STATUS_ICONS[status]}</span>
          <span className={styles.title}>{renderWithHighlights(title)}</span>
          {onClose && (
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={onClose}
              className={styles.close}
            />
          )}
        </div>

        {subTitle && <div className={styles.subtitle}>{subTitle}</div>}
      </div>
    </div>
  );
}
