import { Pagination } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type PropsType = {
  total: number
}

const ListPagination: FC<PropsType> = (props: PropsType) => {
  const { total } = props
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(1)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const currentPage = parseInt(searchParams.get('page') || '') || 1
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 1
    setCurrentPage(currentPage)
    setPageSize(pageSize)
  }, [searchParams])
  const nav = useNavigate()
  const { pathname } = useLocation()
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set('page', page.toString())
    searchParams.set('pageSize', pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
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
