import React, { FC } from 'react'

import styles from './SurveyCard.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Popconfirm, Space, Tag, Modal } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { SURVEY_EDIT_PATHNAME, SURVEY_STAT_PATHNAME } from 'src/router'

const { confirm } = Modal

type propsType = {
  _id: string // 服务端 mongodb 自动生成的不重复id
  isPublished: boolean
  isStar: boolean
  title: string
  answerCount: number
  createAt: string
}

const SurveyCard: FC<propsType> = (props: propsType) => {
  const { _id, isPublished, isStar, title, answerCount, createAt } = props
  const nav = useNavigate()

  const duplicate = () => {
    console.log('duplicate')
  }

  const del = () => {
    confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除这份问卷吗？',
      okText: '确认',
      cancelText: '取消',
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? SURVEY_EDIT_PATHNAME : SURVEY_STAT_PATHNAME}>
            <Space>
              {isStar && <StarOutlined />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷: {answerCount}</span>
            <span>{createAt}</span>
          </Space>
        </div>
      </div>
      <Divider />

      <div className={styles.handler}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              size="small"
              type="text"
              onClick={() => nav(SURVEY_EDIT_PATHNAME)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(SURVEY_EDIT_PATHNAME + _id)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button icon={<StarOutlined />} type="text" size="small">
              标星
            </Button>

            <Popconfirm
              title="复制问卷"
              description="你确定要复制这份问卷吗"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button icon={<CopyOutlined />} type="text" size="small">
                复制
              </Button>
            </Popconfirm>
            <Button icon={<DeleteOutlined />} type="text" size="small" onClick={del}>
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default SurveyCard
