import React, { FC } from 'react'
import { componentConfGroup, ComponentConfType } from 'src/components/SurveyComponents'
import { Typography } from 'antd'
import Styles from './ComponentLib.module.scss'
const { Title } = Typography

const renderComponent = (cmpConf: ComponentConfType) => {
  const { Component } = cmpConf

  return (
    <div className={Styles['component-wrapper']}>
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
            <div>{components.map(c => renderComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default ComponentLib
