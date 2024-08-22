import React, { FC } from 'react'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'

import styles from './Layers.module.scss'
import { Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from 'src/store/componentsReducer'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()

  const dispatch = useDispatch()
  const handleTitleClick = fe_id => {
    if (fe_id !== selectedId) {
      dispatch(changeSelectedId(fe_id))
    }
  }

  return (
    <>
      {componentList.map(componentInfo => {
        const { fe_id, title, isLocked, isHidden } = componentInfo

        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: selectedId === fe_id,
        })

        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {title}
            </div>
            <Space>
              <Button icon={<LockOutlined />} />
              <Button icon={<EyeInvisibleOutlined />} />
            </Space>
          </div>
        )
      })}
    </>
  )
}

export default Layers
