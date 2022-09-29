import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export default function FormC({ onFinish, onFinishFailed }: any) {
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[{ required: false, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="E-mail"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: false, message: 'Please input your password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
