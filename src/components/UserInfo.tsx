import { UserOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useGetUserInfo from 'src/hooks/useGetUserInfo'
import { LOGIN_PATHNAME } from 'src/router'
import { logoutReducer } from 'src/store/userReducer'
import { removeToken } from 'src/utils/userToken'
const UserInfo: FC = () => {
  const { username, nickname } = useGetUserInfo()

  const dispatch = useDispatch()
  const nav = useNavigate()

  const logout = () => {
    dispatch(logoutReducer()) // 清空store中 user state 的存储
    removeToken() // 清空user token 的存储
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
