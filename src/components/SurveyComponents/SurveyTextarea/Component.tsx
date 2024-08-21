import React, { FC } from 'react'
import { Typography, Input } from 'antd'
import { SurveyTextareaDefaultProps, SurveyTextareaPropsType } from './interface'

const { Paragraph } = Typography
const { TextArea } = Input

const SurveyTextarea: FC<SurveyTextareaPropsType> = (props: SurveyTextareaPropsType) => {
  const { title, placeholder } = { ...SurveyTextareaDefaultProps, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default SurveyTextarea
