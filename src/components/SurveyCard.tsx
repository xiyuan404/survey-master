import React, { FC, useState } from 'react'

import styles from './SurveyCard.module.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Divider, Popconfirm, Space, Tag, Modal, message } from 'antd'
import {
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LineChartOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { SURVEY_EDIT_PATHNAME, SURVEY_STAT_PATHNAME } from 'src/router'
import { useRequest } from 'ahooks'
import { surveysAPI } from 'src/service/survey'

const { confirm } = Modal

export type SurveyCardPropsType = {
  _id: string // 服务端 mongodb 自动生成的不重复id
  isPublished: boolean
  isStar: boolean
  title: string
  answerCount: number
  createAt: string
}

const SurveyCard: FC<SurveyCardPropsType> = (props: SurveyCardPropsType) => {
  const { _id, isPublished, isStar, title, answerCount, createAt } = props
  const nav = useNavigate()
  const { pathname } = useLocation()

  // 修改标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () => {
      await surveysAPI.update(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState)
        message.success('更新成功')
      },
    }
  )

  // 复制
  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => await surveysAPI.duplicate(_id),
    {
      manual: true,
      onSuccess(data) {
        // 复制成功,跳转到问卷编辑页
        const { id } = data
        message.success('复制成功')
        nav('/survey/edit/' + id)
      },
    }
  )

  // 删除
  const [isDeleted, setIsDeleted] = useState(false)
  const { run: deleteSurvey, loading: deleteLoading } = useRequest(
    async () => await surveysAPI.update(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess() {
        message.success('删除成功')
        // 删除成功，隐藏surveyCard
        setIsDeleted(true)
      },
    }
  )

  const del = () => {
    confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: '你确定要删除这份问卷吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: deleteSurvey,
    })
  }

  if (isDeleted) return null

  // 部分匹配 manage/star?keyword=test
  if (pathname.indexOf('/manage/star') > -1 && !isStarState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? SURVEY_EDIT_PATHNAME : SURVEY_STAT_PATHNAME}>
            <Space>
              {isStarState && <StarOutlined />}
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
              onClick={() => nav(SURVEY_EDIT_PATHNAME + _id)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(SURVEY_STAT_PATHNAME + _id)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              disabled={changeStarLoading}
              onClick={changeStar}
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>

            <Popconfirm
              title="复制问卷"
              description="你确定要复制这份问卷吗"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button icon={<CopyOutlined />} type="text" size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              onClick={del}
              disabled={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default SurveyCard
