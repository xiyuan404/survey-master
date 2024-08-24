import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Button, Empty, Space, Table, Tag, Typography, Modal, Spin } from 'antd'
import ListSearch from 'src/components/ListSearch'
import useLoadSurveyListData from 'src/hooks/useLoadSurveyListData'

const { Title } = Typography
const { confirm } = Modal

const columns = [
  {
    title: '问卷标题',
    dataIndex: 'title',
  },
  {
    title: '已发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) =>
      isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>,
  },
  {
    title: '问卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
  },
]

const List: FC = () => {
  const { data: result = {}, loading } = useLoadSurveyListData({ isDeleted: true })

  const { list = [], total = 0 } = result

  const [selectedId, setSelectedId] = useState<string[]>([])

  const recover = () => {}
  const del = () => {
    confirm({
      title: '删除后不可恢复',
      type: 'warning',
      onOk: () => {
        console.log(selectedId)
      },
      onCancel: () => {},
    })
  }

  const RenderTable = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedId.length <= 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedId.length <= 0} onClick={del}>
            撤离删除
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedId(selectedRowKeys as string[])
          },
        }}
        dataSource={list}
        columns={columns}
        pagination={false}
        rowKey={survey => survey._id}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <Title level={3}>回收站</Title>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && list.length <= 0 && <Empty />}
      {list.length > 0 && RenderTable}
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default List
