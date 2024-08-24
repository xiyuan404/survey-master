import React, { FC, useState } from 'react'
import styles from './common.module.scss'
import { Button, Empty, Space, Table, Tag, Typography, Modal, Spin, Divider, message } from 'antd'
import ListSearch from 'src/components/ListSearch'
import useLoadSurveyListData from 'src/hooks/useLoadSurveyListData'

import ListPagination from 'src/components/ListPagination'
import { useRequest } from 'ahooks'
import { surveysAPI } from 'src/service/survey'

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
  const {
    data: result = {},
    loading,
    isFirstLoading,
    refresh,
  } = useLoadSurveyListData({ isDeleted: true })

  const { list = [], total = 0 } = result

  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // 恢复
  const { run: recover } = useRequest(
    async () => {
      /**
       * @description 多个异步请求的串行处理
       */
      for await (const id of selectedIds) {
        await surveysAPI.update(id, { isDeleted: false })
      }

      /**
       * @description 多个异步请求的并行处理
       */
      await Promise.all(selectedIds)
    },
    {
      manual: true,
      debounceWait: 500, // 防抖，防止连续触发
      onSuccess() {
        message.success('恢复成功')
        refresh() // 恢复后手动刷新列表
      },
    }
  )

  const del = () => {
    confirm({
      title: '删除后不可恢复',
      type: 'warning',
      onOk: () => {
        console.log(selectedIds)
      },
      onCancel: () => {},
    })
  }

  const RenderTable = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length <= 0} onClick={recover}>
            恢复
          </Button>
          <Button danger disabled={selectedIds.length <= 0} onClick={del}>
            撤离删除
          </Button>
        </Space>
      </div>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
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

      {!loading && list.length <= 0 && <Empty />}
      {list.length > 0 && RenderTable}
      <Divider />

      <div className={styles.footer}>
        <Space>
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
          {!isFirstLoading && <ListPagination total={total} />}
        </Space>
      </div>
    </>
  )
}

export default List
