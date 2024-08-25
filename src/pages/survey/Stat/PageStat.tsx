import { useRequest } from 'ahooks'
import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { statAPI } from 'src/service/stat'
import { Pagination, Spin, Table, Typography } from 'antd'
import useGetComponentInfo from 'src/hooks/useGetComponentInfo'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}
const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  const { id = '' } = useParams()

  const { loading } = useRequest(
    async () => {
      const data = await statAPI.getSurveyStatList(id, {
        page,
        pageSize,
      })
      return data
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess(data) {
        const { total, list } = data
        setTotal(total)
        setList(list)
      },
    }
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c

    const colTitle = props.title || title

    return {
      // title: colTitle,
      title: (
        <span
          style={{
            color: fe_id === selectedComponentId ? '#1890ff' : 'inherit',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          {colTitle}
        </span>
      ),
      dataIndex: fe_id,
    }
  })

  const dataSource = list.map((item: any) => ({ ...item, key: item._id }))

  const RenderTable = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(_, pageSize) => {
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && RenderTable}
    </div>
  )
}

export default PageStat
