import { DeleteOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'
import { removeSelectedComponent } from 'src/store/componentsReducer'
const EditToolbar: FC = () => {
  const { selectedId } = useGetComponentInfo()

  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(removeSelectedComponent())
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
    </Space>
  )
}

export default EditToolbar
