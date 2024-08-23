import { Button, Result } from 'antd'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { MANAGE_INDEX_PATHNAME } from 'src/router'
import styles from './NotFound.module.scss'

const NotFound: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles.wrapper}>
      <Result
        status="warning"
        title="抱歉，你访问的页面不存在"
        extra={
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            Back to Home
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
