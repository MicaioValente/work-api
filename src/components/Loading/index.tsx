import { Alert, Spin } from 'antd';
import React from 'react';

const Loading = ({ loading, setLoadingg, children }: any) => (
  <Spin spinning={loading} tip="Loading...">
    {children}
  </Spin>
);

export default Loading;
