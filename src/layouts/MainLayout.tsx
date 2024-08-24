import { Layout } from 'antd'
import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Logo from 'src/components/Logo'
import UserInfo from 'src/components/UserInfo'
import useLoadUserData from 'src/hooks/useLoadUserData'
import useRedirect from 'src/hooks/useRedirect'

const { Header, Content, Footer } = Layout

const MainLayout: FC = () => {
  const { waitingUserData } = useLoadUserData()
  // useRedirect(waitingUserData)

  return (
    <Layout className={styles.wrapper}>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        <p>Released under the MIT License.</p>
        <p>
          &copy;2024- present. created By{' '}
          <a href="https://github.com/xiyuan404?tab=repositories" style={{ color: '#005a9c' }}>
            XiYuan
          </a>
        </p>
      </Footer>
    </Layout>
  )
}

export default MainLayout
