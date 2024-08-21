import { Typography } from 'antd'
import React, { FC } from 'react'
import { SurveyInfoDefaultProps, SurveyInfoPropsType } from './interface'

const { Title, Paragraph } = Typography

const Component: FC<SurveyInfoPropsType> = (props: SurveyInfoPropsType) => {
  const { title, desc } = { ...SurveyInfoDefaultProps, ...props }

  const descTextList = desc.split('\n')

  return (
    <div>
      <Title style={{ textAlign: 'center', fontSize: '24px' }}>{title}</Title>
      <Paragraph>
        {descTextList.map((line, index) => {
          return (
            <span key={index}>
              {index > 0 && <br />}
              {line}
            </span>
          )
        })}
      </Paragraph>
    </div>
  )
}

export default Component
