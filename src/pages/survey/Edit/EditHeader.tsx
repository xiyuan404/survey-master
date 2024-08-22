import { Button, Input, Space, Typography } from 'antd'

import React, { ChangeEvent, FC, useState } from 'react'

import styles from './EditHeader.module.scss'
import { EditOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from 'src/hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from 'src/store/pageInfoReducer'

const { Title } = Typography

const RenderTitle: FC = () => {
  const { title } = useGetPageInfo()
  const [editState, setEditState] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    dispatch(changePageTitle(newTitle))
  }

  if (editState) {
    return (
      <Input
        value={title}
        onBlur={() => setEditState(false)}
        onPressEnter={() => setEditState(false)}
        onChange={handleChange}
      />
    )
  }

  return (
    <Space align="baseline">
      <Title level={5}>{title}</Title>
      <Button icon={<EditOutlined />} type="text" onClick={() => setEditState(true)} />
    </Space>
  )
}

const EditHeader: FC = () => {
  const nav = useNavigate()

  return (
    <div className={styles['edit-header']}>
      <div className={styles.left}>
        <Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <RenderTitle />
        </Space>
      </div>
      <div className={styles.main}>
        <EditToolbar />
      </div>
      <div className={styles.right}>
        <Space>
          <Button>保存</Button>
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  )
}

export default EditHeader
