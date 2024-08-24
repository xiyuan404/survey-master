import React, { FC } from 'react'
import { Button, Form, Input, message, Space, Typography } from 'antd'

import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from 'src/router'
import { UserAddOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { UserAPI } from 'src/service/user'

const { Password } = Input
const { Title } = Typography

const Register: FC = () => {
  const nav = useNavigate()

  const { run } = useRequest(
    async values => {
      const { username, password } = values
      await UserAPI.register(username, password)
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功')
        nav(LOGIN_PATHNAME) // 跳转到登录页
      },
    }
  )

  const onFinish = values => {
    run(values)
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Title level={2}>
              <UserAddOutlined />
            </Title>
            <Title level={2}>用户注册</Title>
          </Space>
        </div>
        <div>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                { required: true, message: '用户名不能为空' },
                { min: 3, max: 20, message: '字符长度必须在3-20之间' },
                { pattern: /^\w+$/, message: '字母数字或下划线' },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ required: true }]}>
              <Password />
            </Form.Item>
            <Form.Item
              label="确认密码"
              name="confirm"
              dependencies={['password']}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue('password') === value) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(new Error('两次密码不一致'))
                    }
                  },
                }),
              ]}
            >
              <Password />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 14, offset: 8 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  注册
                </Button>
                <Link to={LOGIN_PATHNAME}>已有账号?登录</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
