import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'

import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const tabItems = [
  {
    key: TAB_KEYS.PROP_KEY,
    label: '属性',
    children: <ComponentProp />,
    icon: <FileTextOutlined />,
  },
  {
    key: TAB_KEYS.SETTING_KEY,
    label: '页面设置',
    children: <PageSetting />,
    icon: <SettingOutlined />,
  },
]

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
  const { selectedId } = useGetComponentInfo()

  useEffect(() => {
    if (selectedId === '') {
      setActiveKey(TAB_KEYS.SETTING_KEY)
    } else {
      setActiveKey(TAB_KEYS.PROP_KEY)
    }
  }, [selectedId])

  return <Tabs activeKey={activeKey} items={tabItems} />
}

export default RightPanel
