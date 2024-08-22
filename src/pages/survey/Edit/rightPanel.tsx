import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import PageSetting from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

// TS 枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const tabsItems = [
  {
    key: TAB_KEYS.PROP_KEY,
    label: (
      <span>
        <FileTextOutlined />
        属性
      </span>
    ),
    children: <ComponentProp />,
  },
  {
    key: TAB_KEYS.SETTING_KEY,
    label: (
      <span>
        <SettingOutlined />
        页面设置
      </span>
    ),
    children: <PageSetting />,
  },
]

const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState<TAB_KEYS>(TAB_KEYS.PROP_KEY)
  const { selectedId } = useGetComponentInfo()

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectedId])

  const handleTabClick = (activeKey: string) => {
    if (Object.values(TAB_KEYS).includes(activeKey as TAB_KEYS)) {
      setActiveKey(activeKey as TAB_KEYS)
    }
  }

  return <Tabs activeKey={activeKey} items={tabsItems} onTabClick={handleTabClick}></Tabs>
}

export default RightPanel
