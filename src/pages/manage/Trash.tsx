import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import SurveyCard from 'src/components/SurveyCard'
import { Button, Empty, Space, Table, Tag, Typography, Modal } from 'antd'
import ListSearch from 'src/components/ListSearch'

const { Title } = Typography
const { confirm } = Modal

const rawSurveyList = [
  {
    _id: 'item1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 1,
    createAt: '2024-8-14',
  },
  {
    _id: 'item2',
    title: '问卷1',
    isPublished: true,
    isStar: true,
    answerCount: 1,
    createAt: '2024-8-14',
  },
  {
    _id: 'item3',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 1,
    createAt: '2024-8-14',
  },
]

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
  const [surveyList, setSurveyList] = useState(rawSurveyList)

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
        dataSource={surveyList}
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
      {surveyList.length <= 0 && <Empty />}
      {surveyList.length > 0 && RenderTable}
      <div className={styles.footer}>分页</div>
    </>
  )
}

export default List
