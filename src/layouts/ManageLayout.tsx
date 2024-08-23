import React, { FC, useState } from 'react'

import styles from './ManageLayout.module.scss'
import { Button, Divider, message, Space } from 'antd'
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { surveysAPI } from 'src/service/survey'
import { debug } from 'console'

const ManageLayout: FC = () => {
  const { pathname } = useLocation()
  const nav = useNavigate()

  const [loading, setLoading] = useState(false)

  const createSurvey = async () => {
    setLoading(true)
    const result = await surveysAPI.create()

    const { id } = result
    if (id) {
      nav('/survey/edit/' + id)
      message.success('创建成功')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={createSurvey}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />

          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>

          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
