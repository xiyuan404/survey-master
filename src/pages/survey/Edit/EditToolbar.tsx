import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useBindCanvasKeypress from 'src/hooks/useBindCanvasKeypress'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import {
  toggleComponentHidden,
  copySelectedComponent,
  pasteSelectedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
  moveComponent,
} from 'src/store/componentsReducer'
const EditToolbar: FC = () => {
  const { selectedId, selectedComponentInfo, copiedComponentInfo, componentList } =
    useGetComponentInfo()

  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex >= componentList.length - 1

  const { isLocked = false } = selectedComponentInfo || {}

  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
  }

  const handleHidden = () => {
    dispatch(toggleComponentHidden({ toggleId: selectedId }))
  }
  const handleLock = () => {
    dispatch(
      toggleComponentLocked({
        toggleId: selectedId,
      })
    )
  }

  const copy = () => {
    dispatch(copySelectedComponent())
  }

  const paste = () => {
    dispatch(pasteSelectedComponent())
  }

  const moveUp = () => {
    if (selectedId === '') return
    const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
    if (selectedIndex <= 0) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  const moveDown = () => {
    if (selectedId === '') return
    const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
    const len = componentList.length
    if (selectedIndex >= len - 1) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
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
      <Tooltip title="上移">
        <Button shape="round" icon={<UpOutlined />} onClick={moveUp} disabled={isFirst} />
      </Tooltip>
      <Tooltip title="下移">
        <Button shape="round" icon={<DownOutlined />} onClick={moveDown} disabled={isLast} />
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
