import React, { FC } from 'react'
import { Tabs } from 'antd'

import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import ComponentLib from './ComponentLib'
import Layers from './Layers'

const tabItems = [
  {
    key: 'componentLib',
    label: '组件库',
    children: <ComponentLib />,
    icon: <AppstoreOutlined />,
  },
  {
    key: 'layers',
    label: '图层',
    children: <Layers />,
    icon: <BarsOutlined />,
  },
]

const LeftPanel: FC = () => {
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />
}

export default LeftPanel
