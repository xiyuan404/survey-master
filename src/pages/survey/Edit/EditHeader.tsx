import { Button, Input, Space, Typography } from 'antd'

import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react'

import styles from './EditHeader.module.scss'
import { EditOutlined, LeftOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from './EditToolbar'
import useGetPageInfo from 'src/hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from 'src/store/pageInfoReducer'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import { useKeyPress, useRequest } from 'ahooks'
import { surveysAPI } from 'src/service/survey'

const { Title } = Typography

// 显示和修改标题
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

// 手动保存编辑页,判断loading防止连续触发

const SaveButton = () => {
  const { componentList } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()
  const { id } = useParams()
  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await surveysAPI.update(id, { ...pageInfo, componentList })
    },
    { manual: true }
  )

  useKeyPress(['ctrl.s', 'meta.s'], e => {
    e.preventDefault()
    if (!loading) save()
  })

  return (
    <Button disabled={loading} onClick={save} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
  )
}

// 编辑页头部
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
          <SaveButton />
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  )
}

export default EditHeader
