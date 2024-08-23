import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetUserInfo from 'src/hooks/useGetUserInfo'
import { HOME_PATHNAME, LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from 'src/router'

const { Title } = Typography

const Logo: FC = () => {
  const [pathname, setPathname] = useState(HOME_PATHNAME)

  const { username } = useGetUserInfo()

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])

  return (
    <Link to={pathname}>
      <Space>
        <FormOutlined />
        <Title>Survey Master</Title>
      </Space>
    </Link>
  )
}

export default Logo
