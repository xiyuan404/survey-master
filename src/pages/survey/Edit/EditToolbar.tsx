import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useBindCanvasKeypress from 'src/hooks/useBindCanvasKeypress'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import {
  changeSelectedComponentToHidden,
  copySelectedComponent,
  pasteSelectedComponent,
  removeSelectedComponent,
  toggleSelectedComponentLocked,
} from 'src/store/componentsReducer'
const EditToolbar: FC = () => {
  const { selectedId, selectedComponentInfo, copiedComponentInfo } = useGetComponentInfo()

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

  const copy = () => {
    dispatch(copySelectedComponent())
  }

  const paste = () => {
    dispatch(pasteSelectedComponent())
  }

  useBindCanvasKeypress()

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
      <Tooltip title="复制">
        <Button shape="round" icon={<CopyOutlined />} onClick={copy} />
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="round"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={!copiedComponentInfo}
        />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
