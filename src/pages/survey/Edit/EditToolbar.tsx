import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import {
  changeSelectedComponentToHidden,
  removeSelectedComponent,
  toggleSelectedComponentLocked,
} from 'src/store/componentsReducer'
const EditToolbar: FC = () => {
  const { selectedId, selectedComponentInfo } = useGetComponentInfo()

  const { isLocked = false } = selectedComponentInfo || {}

  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }

  const handleHidden = () => {
    dispatch(changeSelectedComponentToHidden({ isHidden: true, currSelectedId: selectedId }))
  }
  const handleLock = () => {
    dispatch(toggleSelectedComponentLocked())
  }
  return (
    <Space>
      <Tooltip title="删除">
        <Button
          shape="round"
          icon={<DeleteOutlined />}
          disabled={!selectedId}
          onClick={handleDelete}
        />
      </Tooltip>
      <Tooltip title="隐藏">
        <Button
          shape="round"
          icon={<EyeInvisibleOutlined />}
          disabled={!selectedId}
          onClick={handleHidden}
        />
      </Tooltip>
      <Tooltip title={isLocked ? '解锁' : '解锁'}>
        <Button
          shape="round"
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
          disabled={!selectedId}
          onClick={handleLock}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
