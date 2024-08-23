import React, { FC } from 'react'

import { Button, Typography } from 'antd'
import styles from './Home.module.scss'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

const Home: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <Button type="primary" onClick={() => nav('/manage/list')}>
          开始使用
        </Button>
      </div>
    </div>
  )
}

export default Home
