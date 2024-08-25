import { Header } from 'antd/es/layout/layout'
import React, { FC, useRef } from 'react'

import styles from './StatHeader.module.scss'
import { Button, Input, InputRef, message, Popover, Space, Tooltip, Typography } from 'antd'
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { SURVEY_EDIT_PATHNAME } from 'src/router'
import { QRCodeSVG } from 'qrcode.react'

const { Title } = Typography

type StatHeaderPropsType = {
  title: string
}

const StatHeader: FC<StatHeaderPropsType> = (props: StatHeaderPropsType) => {
  const { title } = props

  const nav = useNavigate()
  const { id } = useParams()

  // 拷贝
  const urlInputRef = useRef<InputRef>(null)
  const copy = () => {
    const urlInputElem = urlInputRef.current
    if (urlInputElem === null) return
    urlInputElem.select() //选择输入框中内容
    document.execCommand('copy') // 拷贝选择内容
    message.success('copied to clipboard')
  }

  const RenderURL = () => {
    const url = `http://localhost:3000/survey/${id}`

    const QRCodeElem = (
      <div>
        <QRCodeSVG value={url} />
      </div>
    )

    return (
      <Space>
        <Input ref={urlInputRef} value={url} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy} />
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />} />
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <Space>
          <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
            返回
          </Button>
          <Title>{title}</Title>
        </Space>
      </div>
      <div className={styles.main}>{RenderURL()}</div>
      <div className={styles.right}>
        <Button
          type="primary"
          onClick={() => {
            nav(SURVEY_EDIT_PATHNAME + id)
          }}
        >
          编辑问卷
        </Button>
      </div>
    </div>
  )
}

export default StatHeader
