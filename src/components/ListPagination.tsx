/**
 * 受控分页组件,修改url查询参数（page,pageSize)会改变分页组件的中的页数和pageSize
 * 改变分页组件的中的页数和pageSize也会修改url查询参数（page,pageSize)
 * useLoadSurveyList会监听url查询参数的变化重新向后端发起请求，获取新的问卷列表
 */

import { Pagination } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from 'src/constants'

type PropsType = {
  total: number
}

const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchParams] = useSearchParams()

  // 监听url查询参数(page,pageSize)变化，同步到分页组件
  useEffect(() => {
    const currentPage = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || 10
    setCurrentPage(currentPage)
    setPageSize(pageSize)
  }, [searchParams])

  const nav = useNavigate()
  const { pathname } = useLocation()

  // 分页组件中页码或每页条数变化，会触发onChange事件,修改url中相应查询参数，useLoadSurveyList会监听url查询参数的变化重新向后端发起请求，获取新的问卷列表
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(), // 除了改变url查询参数中page,pageSize之外，其他的参数参数也要带上
    })
  }

  return (
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  )
}

export default ListPagination
