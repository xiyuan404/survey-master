import React, { FC } from 'react'
import { SurveyParagraphDefaultProps, SurveyParagraphPropsType } from './interface'
import { Typography } from 'antd'

const { Paragraph } = Typography

const Component: FC<SurveyParagraphPropsType> = (props: SurveyParagraphPropsType) => {
  const { text, isCenter } = { ...SurveyParagraphDefaultProps, ...props }

  const textList = text.split('\n')

  return (
    <Paragraph style={{ textAlign: isCenter ? 'center' : 'start' }}>
      {textList.map((t, index) => {
        return (
          <span key={index}>
            {index > 0 && <br />}
            {t}
          </span>
        )
      })}
    </Paragraph>
  )
}

export default Component
