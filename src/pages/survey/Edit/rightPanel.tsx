import React, { FC } from 'react'
import { Tabs } from 'antd'

import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'

const tabItems = [
  {
    key: 'prop',
    label: '属性',
    children: <ComponentProp />,
    icon: <FileTextOutlined />,
  },
  {
    key: 'setting',
    label: '页面设置',
    children: <PageSetting />,
    icon: <SettingOutlined />,
  },
]

const RightPanel: FC = () => {
  return <Tabs defaultActiveKey="prop" items={tabItems} />
}

export default RightPanel
