'use client';

import { useEffect } from 'react';
import { Button, Result } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <Result
          status="500"
          title="Ошибка приложения"
          subTitle="Что-то пошло не так. Пожалуйста, попробуйте снова."
          extra={[
            <Button 
              key="home" 
              type="primary" 
              icon={<HomeOutlined />}
              href="/"
            >
              На главную
            </Button>,
            <Button 
              key="retry" 
              icon={<ReloadOutlined />}
              onClick={() => reset()}
            >
              Попробовать снова
            </Button>,
          ]}
        />
      </body>
    </html>
  );
}
