import React, { FC, useEffect } from 'react'
import { Button, Checkbox, Form, Input, message, Space, Typography } from 'antd'

import styles from './Register.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME, Register_PATHNAME } from 'src/router'
import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { UserAPI } from 'src/service/user'
import { setToken } from 'src/utils/userToken'
import { useDispatch } from 'react-redux'

const { Password } = Input
const { Title } = Typography

const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = 'PASSWORD'

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username)
  localStorage.setItem(PASSWORD_KEY, password)
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(PASSWORD_KEY)
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  }
}

const Login: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage()
    form.setFieldsValue({ username, password })
  }, [])

  const { run } = useRequest(
    async (username: string, password: string) => {
      const data = await UserAPI.login(username, password)
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { token = '' } = result
        setToken(token)

        message.success('登录成功')
        nav(MANAGE_INDEX_PATHNAME)
      },
    }
  )

  const onFinish = (values: { username: string; password: string; remember: boolean }) => {
    const { username, password, remember } = values
    run(username, password)
    if (remember) {
      rememberUser(username, password)
    } else {
      deleteUserFromStorage()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div style={{ textAlign: 'center' }}>
          <Space>
            <Title level={2}>
              <UserOutlined />
            </Title>
            <Title level={2}>用户登录</Title>
          </Space>
        </div>
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            form={form}
          >
            <Form.Item label="用户名" name="username">
              <Input />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
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
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 14 }}>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6 }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Link to={Register_PATHNAME}>还没账号?注册</Link>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
