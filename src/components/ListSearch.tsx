import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const { Search } = Input

const LIST_SEARCH_PARAM_KEY = 'keyword'

const ListSearch: FC = () => {
  // 同步搜索框中的值到state中
  const [value, setValue] = useState('')

  // 获取input value, 修改url
  const { pathname } = useLocation()
  const nav = useNavigate()

  // 获取url参数，并设置到input value
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    setValue(newVal)
  }, [searchParams])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleSearch = (value: string) => {
    // 修改地址栏中的url参数
    nav({
      pathname,
      search: LIST_SEARCH_PARAM_KEY + '=' + value,
    })
  }

  return (
    <Search
      style={{ width: '260px' }}
      allowClear
      placeholder="查询问卷"
      value={value}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  )
}

export default ListSearch
