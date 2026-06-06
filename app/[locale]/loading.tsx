import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function GlobalLoading() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <Spin 
        indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} 
        size="large"
      />
    </div>
  );
}
