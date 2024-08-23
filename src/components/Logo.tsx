import { FormOutlined } from '@ant-design/icons'
import { Space, Typography } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetUserInfo from 'src/hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from 'src/router'
import styles from './Logo.module.scss'

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
      <div className={styles.wrapper}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>问卷星</Title>
        </Space>
      </div>
    </Link>
  )
}

export default Logo
