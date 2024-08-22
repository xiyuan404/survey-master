import React, { ChangeEvent, FC, useState } from 'react'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'

import styles from './Layers.module.scss'
import { Button, Input, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import {
  changeComponentTitle,
  changeSelectedId,
  toggleComponentHidden,
  toggleComponentLocked,
} from 'src/store/componentsReducer'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()

  const [changingTitleId, setChangingTitleId] = useState('')

  const dispatch = useDispatch()

  const handleTitleClick = (fe_id: string) => {
    if (fe_id !== selectedId) {
      // 当前组件未被选中，点击选中
      dispatch(changeSelectedId(fe_id))
      setChangingTitleId('')
    } else {
      // 当前组件已经选中，点击切换成输入框
      setChangingTitleId(fe_id)
    }
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value
    console.log('newTitle', newTitle)
    dispatch(
      changeComponentTitle({
        newTitle,
        changingTitleId,
      })
    )
  }

  // 切换 隐藏和显示
  const changeHidden = fe_id => {
    dispatch(toggleComponentHidden({ toggleId: fe_id }))
  }

  // 切换 锁定/解锁
  const changeLocked = (fe_id: string) => {
    dispatch(
      toggleComponentLocked({
        toggleId: fe_id,
      })
    )
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
              {changingTitleId === fe_id && (
                <Input
                  onBlur={() => setChangingTitleId('')}
                  onPressEnter={() => setChangingTitleId('')}
                  onChange={handleTitleChange}
                />
              )}
              {changingTitleId !== fe_id && title}
            </div>
            <div className={styles.handler}>
              <Space>
                <Button
                  size="small"
                  shape="circle"
                  icon={<EyeInvisibleOutlined />}
                  className={!isHidden ? styles.btn : ''}
                  type={isHidden ? 'primary' : 'text'}
                  onClick={() => changeHidden(fe_id)}
                />
                <Button
                  size="small"
                  shape="circle"
                  icon={<LockOutlined />}
                  className={!isLocked ? styles.btn : ''}
                  type={isLocked ? 'primary' : 'text'}
                  onClick={() => changeLocked(fe_id)}
                />
              </Space>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
