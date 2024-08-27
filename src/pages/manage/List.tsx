import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import styles from './common.module.scss'
import SurveyCard, { SurveyCardPropsType } from 'src/components/SurveyCard'
import { Empty, Spin, Typography } from 'antd'
import ListSearch from 'src/components/ListSearch'
import useLoadSurveyListData from 'src/hooks/useLoadSurveyListData'
import { useDebounceFn, useRequest } from 'ahooks'
import { surveysAPI } from 'src/service/survey'
import { useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from 'src/constants'

const { Title } = Typography

const List: FC = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  let hasMoreData = useMemo(() => list.length < total, [total, list])
  const [searchParams] = useSearchParams()
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || undefined

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await surveysAPI.list({
        page,
        pageSize: 10,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: newList = [], total = 0 } = result
        setList(list.concat(newList))
        setTotal(total)
        setPage(page + 1)
      },
      onFinally() {},
    }
  )

  // 尝试去触发加载更多
  const containerRef = useRef<HTMLDivElement>(null)
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const containerElem = containerRef.current
      if (containerElem === null) return
      const { bottom } = containerElem.getBoundingClientRect()
      if (bottom <= document.body.clientHeight) {
        console.log('try load more ...')
        load()
      }
    },
    { wait: 1000 }
  )
  //keyword 变化时，重置信息
  useEffect(() => {
    setPage(1)
    setList([])
    setTotal(0)
    console.log('keyword变化重置状态')
  }, [keyword])

  // 加载第一页，初始化
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])

  useEffect(() => {
    if (hasMoreData) {
      window.addEventListener('scroll', tryLoadMore)
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore)
    }
  }, [searchParams, hasMoreData])

  /* // 不依赖useRequest版本获取问卷列表
  const [list, setList] = useState<SurveyCardPropsType[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await surveysAPI.list({})
      const { list = [], total = 0 } = data
      setList(list)
      setTotal(total)
      setLoading(false)
    }
    load()
  }, []) */

  const renderLoadMore = useMemo(() => {
    if (loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!hasMoreData) return <span>没有更多数据了</span>
    return <span> 加载下一页</span>
  }, [loading, hasMoreData, total])

  return (
    <>
      <div className={styles.header}>
        <Title level={3} className={styles.left}>
          header
        </Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((item: SurveyCardPropsType) => <SurveyCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{renderLoadMore}</div>
      </div>
    </>
  )
}

export default List
