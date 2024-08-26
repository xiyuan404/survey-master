import React, { FC, useCallback } from 'react'
import { componentConfGroup, ComponentConfType } from 'src/components/SurveyComponents'
import { Typography } from 'antd'
import Styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from 'src/store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'
const { Title } = Typography

const RenderComponent: FC<ComponentConfType> = (cmpConf: ComponentConfType) => {
  const { Component, title, type, defaultProps } = cmpConf

  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }, [])

  return (
    <div key={type} className={Styles['component-wrapper']} onClick={handleClick}>
      <div className={Styles['shield-layer']}>
        <Component />
      </div>
    </div>
  )
}

const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map(group => {
        const { groupName, groupId, components } = group
        return (
          <div key={groupId} className={Styles['group-wrapper']}>
            <Title level={3} style={{ fontSize: '16px' }}>
              {groupName}
            </Title>
            <div>{components.map(c => RenderComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
